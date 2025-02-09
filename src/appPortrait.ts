import { Application } from 'pixi.js';

import { loader } from './loader/loader';

export async function createApp([width, height]: Point): Promise<Application> {
    const app = new Application({
        width,
        height,
        backgroundAlpha: 1,
        clearBeforeRender: false,
        autoDensity: true,
        antialias: true,
        // powerPreference: 'low-power',
        powerPreference: 'high-performance',
    });

    await loader();

    return app;
}
