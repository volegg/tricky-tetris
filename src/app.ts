import { Application } from 'pixi.js';

export function createApp([width, height]: Point) {
    return new Application({
        width,
        height,
        backgroundAlpha: 0,
        clearBeforeRender: false,
        autoDensity: true,
        antialias: true,
        // powerPreference: 'low-power',
        powerPreference: 'high-performance',
    });
}
