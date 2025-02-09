import { Application } from 'pixi.js';

export function createApp([width, height]: Point) {
    return new Application({
        width,
        height,
        background: '#1D1D1D',
        clearBeforeRender: false,
        autoDensity: true,
        antialias: true,
        // powerPreference: 'low-power',
        powerPreference: 'high-performance',
    });
}
