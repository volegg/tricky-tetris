import { createApp } from 'src/app';
import { World } from 'src/const/world';
import { createFPSStat } from 'src/utils/fpsStat';

import { initLogger } from './logger/initLogger';

initLogger();

document.addEventListener('DOMContentLoaded', () => {
    const app = createApp([World.width, World.height]);

    document.body.appendChild(app.view as HTMLCanvasElement);

    createFPSStat(app);

    document.getElementById('splashscreen')?.remove();
});
