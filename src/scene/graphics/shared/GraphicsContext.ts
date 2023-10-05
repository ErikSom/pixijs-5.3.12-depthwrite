/* eslint-disable max-len */
import EventEmitter from 'eventemitter3';
import { Color, type ColorSource } from '../../../color/Color';
import { Matrix } from '../../../maths/matrix/Matrix';
import { Point } from '../../../maths/point/Point';
import { Texture } from '../../../rendering/renderers/shared/texture/Texture';
import { uid } from '../../../utils/data/uid';
import { deprecation } from '../../../utils/logging/deprecation';
import { Bounds } from '../../container/bounds/Bounds';
import { GraphicsPath } from './path/GraphicsPath';
import { SVGParser } from './svg/SVGParser';
import { convertFillInputToFillStyle } from './utils/convertFillInputToFillStyle';

import type { PointData } from '../../../maths/point/PointData';
import type { ShapePrimitive } from '../../../maths/shapes/ShapePrimitive';
import type { Shader } from '../../../rendering/renderers/shared/shader/Shader';
import type { TextureDestroyOptions, TypeOrBool } from '../../container/destroyTypes';
import type { LineCap, LineJoin } from './const';
import type { FillGradient } from './fill/FillGradient';
import type { FillPattern } from './fill/FillPattern';
import type { ShapePath } from './path/ShapePath';

export interface FillStyle
{
    color?: ColorSource;
    alpha?: number;
    texture?: Texture | null;
    matrix?: Matrix | null;
    fill?: FillPattern | FillGradient | null;
}

export type ConvertedFillStyle = Omit<Required<FillStyle>, 'color'> & { color: number };

export interface PatternFillStyle
{
    fill?: FillPattern | FillGradient;
    color?: number;
    alpha?: number;
}

export interface StrokeStyle extends FillStyle
{
    width?: number;
    alignment?: number;
    // native?: boolean;
    cap?: LineCap;
    join?: LineJoin;
    miterLimit?: number;
}

export type ConvertedStrokeStyle = Omit<StrokeStyle, 'color'> & ConvertedFillStyle;

const tmpPoint = new Point();

export type BatchMode = 'auto' | 'batch' | 'no-batch';

export type FillStyleInputs = ColorSource | FillGradient | CanvasPattern | PatternFillStyle | FillStyle | ConvertedFillStyle | StrokeStyle | ConvertedStrokeStyle;

export interface FillInstruction
{
    action: 'fill' | 'stroke' | 'cut'
    data: { style: ConvertedFillStyle, path: GraphicsPath, hole?: GraphicsPath }
}

export interface TextureInstruction
{
    action: 'texture'
    data: {
        image: Texture,

        dx: number
        dy: number

        dw: number
        dh: number

        transform: Matrix
        alpha: number
        style: number,
    }
}

export type GraphicsInstructions = FillInstruction | TextureInstruction;

const tempMatrix = new Matrix();

export class GraphicsContext extends EventEmitter<{
    update: GraphicsContext
    destroy: GraphicsContext
}>
{
    public static defaultFillStyle: ConvertedFillStyle = {
        color: 0,
        alpha: 1,
        texture: Texture.WHITE,
        matrix: null,
        fill: null,
    };

    public static defaultStrokeStyle: ConvertedStrokeStyle = {
        width: 1,
        color: 0,
        alpha: 1,
        alignment: 0.5,
        miterLimit: 10,
        cap: 'butt',
        join: 'miter',
        texture: Texture.WHITE,
        matrix: null,
        fill: null,
    };

    public uid = uid('graphicsContext');
    public dirty = true;
    public batchMode: BatchMode = 'auto';
    public instructions: GraphicsInstructions[] = [];
    public customShader?: Shader;

    private _activePath: GraphicsPath = new GraphicsPath();
    private _transform: Matrix = new Matrix();

    private _fillStyle: ConvertedFillStyle = { ...GraphicsContext.defaultFillStyle };
    private _strokeStyle: ConvertedStrokeStyle = { ...GraphicsContext.defaultStrokeStyle };
    private _stateStack: { fillStyle: ConvertedFillStyle; strokeStyle: ConvertedStrokeStyle, transform: Matrix }[] = [];

    private _tick = 0;

    private _bounds = new Bounds();
    private _boundsDirty = true;

    get fillStyle(): ConvertedFillStyle
    {
        return this._fillStyle;
    }

    set fillStyle(value: FillStyleInputs)
    {
        this._fillStyle = convertFillInputToFillStyle(value, GraphicsContext.defaultFillStyle);
    }

    get strokeStyle(): ConvertedStrokeStyle
    {
        return this._strokeStyle;
    }

    set strokeStyle(value: FillStyleInputs)
    {
        this._strokeStyle = convertFillInputToFillStyle(value, GraphicsContext.defaultStrokeStyle) as ConvertedStrokeStyle;
    }

    public texture(texture: Texture): this;
    public texture(texture: Texture, tint: ColorSource): this;
    public texture(texture: Texture, tint: ColorSource, dx: number, dy: number): this;
    public texture(texture: Texture, tint: ColorSource, dx: number, dy: number, dw: number, dh: number): this;
    public texture(texture: Texture, tint?: ColorSource, dx?: number, dy?: number, dw?: number, dh?: number): this
    {
        this.instructions.push({
            action: 'texture',
            data: {
                image: texture,

                dx: dx || 0,
                dy: dy || 0,

                dw: dw || texture.frameWidth,
                dh: dh || texture.frameHeight,

                transform: this._transform.clone(),
                alpha: this._fillStyle.alpha,
                style: tint ? Color.shared.setValue(tint).toNumber() : 0,
            }
        });

        this.onUpdate();

        return this;
    }

    public beginPath(): this
    {
        this._activePath = new GraphicsPath();

        return this;
    }

    /** @deprecated 8.0.0 */
    public fill(color: ColorSource, alpha: number): this;
    public fill(style?: FillStyleInputs): this;
    public fill(style?: FillStyleInputs, alpha?: number): this
    {
        let path: GraphicsPath;

        const lastInstruction = this.instructions[this.instructions.length - 1];

        if (this._tick === 0 && lastInstruction && lastInstruction.action === 'stroke')
        {
            path = lastInstruction.data.path;
        }
        else
        {
            path = this._activePath.clone();
        }

        if (!path) return this;

        if (style)
        {
            if (alpha !== undefined && typeof style === 'number')
            {
                deprecation('8.0.0', 'GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead');
                style = { color: style, alpha };
            }
            this._fillStyle = convertFillInputToFillStyle(style, GraphicsContext.defaultFillStyle);
        }

        // TODO not a fan of the clone!!
        this.instructions.push({
            action: 'fill',
            // TODO copy fill style!
            data: { style: this.fillStyle, path }
        });

        this.onUpdate();

        this._activePath.instructions.length = 0;
        this._tick = 0;

        return this;
    }

    public stroke(style?: FillStyleInputs): this
    {
        let path: GraphicsPath;

        const lastInstruction = this.instructions[this.instructions.length - 1];

        if (this._tick === 0 && lastInstruction && lastInstruction.action === 'fill')
        {
            path = lastInstruction.data.path;
        }
        else
        {
            path = this._activePath.clone();
        }

        if (!path) return this;

        if (style)
        {
            this._strokeStyle = convertFillInputToFillStyle(style, GraphicsContext.defaultStrokeStyle);
        }

        // TODO not a fan of the clone!!
        this.instructions.push({
            action: 'stroke',
            // TODO copy fill style!
            data: { style: this.strokeStyle, path }
        });

        this.onUpdate();

        this._activePath.instructions.length = 0;
        this._tick = 0;

        return this;
    }

    public cut(): this
    {
        for (let i = 0; i < 2; i++)
        {
            const lastInstruction = this.instructions[this.instructions.length - 1 - i];

            const holePath = this._activePath.clone();

            if (lastInstruction)
            {
                if (lastInstruction.action === 'stroke' || lastInstruction.action === 'fill')
                {
                    lastInstruction.data.hole = holePath;
                }
            }
        }

        this._activePath.instructions.length = 0;

        return this;
    }

    public arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): this
    {
        this._tick++;

        const t = this._transform;

        this._activePath.arc(
            (t.a * x) + (t.c * y) + t.tx,
            (t.b * x) + (t.d * y) + t.ty,
            radius,
            startAngle,
            endAngle,
            counterclockwise,
        );

        return this;
    }

    public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this
    {
        this._tick++;

        const t = this._transform;

        this._activePath.arcTo(
            (t.a * x1) + (t.c * y1) + t.tx,
            (t.b * x1) + (t.d * y1) + t.ty,
            (t.a * x2) + (t.c * y2) + t.tx,
            (t.b * x2) + (t.d * y2) + t.ty,
            radius,
        );

        return this;
    }

    public arcToSvg(
        rx: number, ry: number,
        xAxisRotation: number,
        largeArcFlag: number,
        sweepFlag: number,
        x: number, y: number
    ): this
    {
        this._tick++;

        const t = this._transform;

        this._activePath.arcToSvg(
            rx, ry,
            xAxisRotation, // should we rotate this with transform??
            largeArcFlag,
            sweepFlag,
            (t.a * x) + (t.c * y) + t.tx,
            (t.b * x) + (t.d * y) + t.ty,
        );

        return this;
    }

    public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this
    {
        this._tick++;

        // TODO optimize for no transform
        const t = this._transform;

        this._activePath.bezierCurveTo(
            (t.a * cp1x) + (t.c * cp1y) + t.tx,
            (t.b * cp1x) + (t.d * cp1y) + t.ty,
            (t.a * cp2x) + (t.c * cp2y) + t.tx,
            (t.b * cp2x) + (t.d * cp2y) + t.ty,
            (t.a * x) + (t.c * y) + t.tx,
            (t.b * x) + (t.d * y) + t.ty,
        );

        return this;
    }

    public closePath(): this
    {
        this._tick++;

        this._activePath?.closePath();

        return this;
    }

    public ellipse(x: number, y: number, radiusX: number, radiusY: number): this
    {
        this._tick++;

        this._activePath.ellipse(x, y, radiusX, radiusY, this._transform.clone());

        return this;
    }

    public circle(x: number, y: number, radius: number): this
    {
        this._tick++;

        this._activePath.circle(x, y, radius, this._transform.clone());

        return this;
    }

    public path(path: GraphicsPath): this
    {
        this._tick++;

        this._activePath.addPath(path, this._transform.clone());

        return this;
    }

    public lineTo(x: number, y: number): this
    {
        this._tick++;

        const t = this._transform;

        this._activePath.lineTo(
            (t.a * x) + (t.c * y) + t.tx,
            (t.b * x) + (t.d * y) + t.ty
        );

        return this;
    }

    public moveTo(x: number, y: number): this
    {
        this._tick++;

        const t = this._transform;

        this._activePath.moveTo(
            (t.a * x) + (t.c * y) + t.tx,
            (t.b * x) + (t.d * y) + t.ty
        );

        return this;
    }

    public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
    {
        this._tick++;

        const t = this._transform;

        this._activePath.quadraticCurveTo(
            (t.a * cpx) + (t.c * cpy) + t.tx,
            (t.b * cpx) + (t.d * cpy) + t.ty,
            (t.a * x) + (t.c * y) + t.tx,
            (t.b * x) + (t.d * y) + t.ty,
        );
    }

    public rect(x: number, y: number, w: number, h: number): this
    {
        this._tick++;

        this._activePath.rect(x, y, w, h, this._transform.clone());

        return this;
    }

    public roundRect(x: number, y: number, w: number, h: number, radii?: number): this
    {
        this._tick++;

        this._activePath.roundRect(x, y, w, h, radii, this._transform.clone());

        return this;
    }

    public poly(points: number[], close?: boolean): this
    {
        this._tick++;

        this._activePath.poly(points, close, this._transform.clone());

        return this;
    }

    public star(x: number, y: number, points: number, radius: number, innerRadius: number, rotation: number): this
    {
        this._tick++;

        this._activePath.star(x, y, points, radius, innerRadius, rotation, this._transform.clone());

        return this;
    }

    public svg(svg: string): void
    {
        this._tick++;

        SVGParser(svg, this);
    }

    public restore(): void
    {
        const state = this._stateStack.pop();

        if (state)
        {
            this._transform = state.transform;
            this._fillStyle = state.fillStyle;
            this._strokeStyle = state.strokeStyle;
        }
    }

    public save(): void
    {
        this._stateStack.push({
            transform: this._transform.clone(),
            fillStyle: { ...this._fillStyle },
            strokeStyle: { ...this._strokeStyle },
        });
    }

    public getTransform(): Matrix
    {
        return this._transform;
    }

    public resetTransform(): this
    {
        this._transform.identity();

        return this;
    }

    public rotate(angle: number): this
    {
        this._transform.rotate(angle);

        return this;
    }

    public scale(x: number, y: number = x): this
    {
        this._transform.scale(x, y);

        return this;
    }

    public setTransform(transform: Matrix): this;
    public setTransform(a: number, b: number, c: number, d: number, dx: number, dy: number): this;
    public setTransform(a: number | Matrix, b?: number, c?: number, d?: number, dx?: number, dy?: number): this
    {
        if (a instanceof Matrix)
        {
            this._transform.set(a.a, a.b, a.c, a.d, a.tx, a.ty);

            return this;
        }

        this._transform.set(a, b, c, d, dx, dy);

        return this;
    }

    public transform(transform: Matrix): this;
    public transform(a: number, b: number, c: number, d: number, dx: number, dy: number): this;
    public transform(a: number | Matrix, b?: number, c?: number, d?: number, dx?: number, dy?: number): this
    {
        if (a instanceof Matrix)
        {
            this._transform.append(a);

            return this;
        }

        tempMatrix.set(a, b, c, d, dx, dy);
        this._transform.append(tempMatrix);

        return this;
    }

    public translate(x: number, y: number): this
    {
        this._transform.translate(x, y);

        return this;
    }

    public clear(): this
    {
        this.instructions.length = 0;
        this.resetTransform();

        this.onUpdate();

        return this;
    }

    protected onUpdate(): void
    {
        if (this.dirty) return;

        this.emit('update', this, 0x10);
        this.dirty = true;
        this._boundsDirty = true;
    }

    get bounds(): Bounds
    {
        if (!this._boundsDirty) return this._bounds;

        // TODO switch to idy dirty with tick..
        const bounds = this._bounds;

        bounds.clear();

        for (let i = 0; i < this.instructions.length; i++)
        {
            const instruction = this.instructions[i];
            const action = instruction.action;

            if (action === 'fill')
            {
                const data = instruction.data as FillInstruction['data'];

                bounds.addBounds(data.path.bounds);
            }
            else if (action === 'texture')
            {
                const data = instruction.data as TextureInstruction['data'];

                bounds.pushMatrix(data.transform);
                bounds.addFrame(data.dx, data.dy, data.dx + data.dw, data.dy + data.dh);
                bounds.popMatrix();
            }
        }

        return bounds;
    }

    /**
     * Check to see if a point is contained within this geometry.
     * @param point - Point to check if it's contained.
     * @returns {boolean} `true` if the point is contained within geometry.
     */
    public containsPoint(point: PointData): boolean
    {
        const instructions = this.instructions;
        let hasHit = false;

        // TODO: we should cache the bounds
        instructions.forEach((instruction) =>
        {
            const data = instruction.data as FillInstruction['data'];
            const path = data.path;

            if (!instruction.action || !path) return;

            const style = data.style;
            const shapes = path.shapePath?.shapePrimitives;

            this._forEachShape(shapes, (shape) =>
            {
                if (!style || !shape) return;

                if (typeof style !== 'number' && style.matrix)
                {
                    style.matrix.applyInverse(point, tmpPoint);
                }
                else
                {
                    tmpPoint.copyFrom(point);
                }

                hasHit = shape.contains(tmpPoint.x, tmpPoint.y);

                const holes = data.hole;

                if (!holes) return;

                const holeShapes = holes.shapePath?.shapePrimitives;

                if (!holeShapes) return;

                this._forEachShape(holeShapes, (hole) =>
                {
                    if (hole.contains(tmpPoint.x, tmpPoint.y))
                    {
                        hasHit = false;
                    }
                });
            });
        });

        return hasHit;
    }

    private _forEachShape(shapes: ShapePath['shapePrimitives'] | undefined, callback: (shape: ShapePrimitive) => void)
    {
        shapes?.forEach((shapePrimitive) =>
        {
            const shape = shapePrimitive?.shape;

            if (shape)
            {
                callback(shape);
            }
        });
    }

    /**
     * Destroys the GraphicsData object.
     * @param options - Options parameter. A boolean will act as if all options
     *  have been set to that value
     * @param {boolean} [options.texture=false] - Should it destroy the current texture of the fill/stroke style?
     * @param {boolean} [options.textureSource=false] - Should it destroy the texture source of the fill/stroke style?
     */
    public destroy(options: TypeOrBool<TextureDestroyOptions> = false): void
    {
        this._stateStack.length = 0;
        this._transform = null;

        this.emit('destroy', this);
        this.removeAllListeners();

        const destroyTexture = typeof options === 'boolean' ? options : options?.texture;

        if (destroyTexture)
        {
            const destroyTextureSource = typeof options === 'boolean' ? options : options?.textureSource;

            if (this._fillStyle.texture)
            {
                this._fillStyle.texture.destroy(destroyTextureSource);
            }

            if (this._strokeStyle.texture)
            {
                this._strokeStyle.texture.destroy(destroyTextureSource);
            }
        }

        this._fillStyle = null;
        this._strokeStyle = null;

        this.instructions = null;
        this._activePath = null;
        this._bounds = null;
        this._stateStack = null;
        this.customShader = null;
        this._transform = null;
    }
}

