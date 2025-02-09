import { createApp } from 'src/appPortrait';
import { WorldPortrair } from 'src/const/world';
import { createFPSStat } from 'src/utils/fpsStat';

import { TrKey } from './const/translations';
import { t } from './i18n/translate';
import { initLogger } from './logger/initLogger';
import { getViewportSize } from './utils/getViewportSize';
import { pressAnyButton } from './utils/pressAnyButton';

initLogger();

document.addEventListener('DOMContentLoaded', async () => {
    const [worldWidth, worldHeight] = [WorldPortrair.width, WorldPortrair.height];

    const app = await createApp([worldWidth, worldHeight]);

    const { view } = app.renderer;

    const [viewportWidth, viewportHeight] = await getViewportSize();

    const widthRatio = viewportWidth / worldWidth;
    const heightRatio = viewportHeight / worldHeight;

    if (view && view.style) {
        if (widthRatio > heightRatio) {
            view.style.width = 'auto';
            view.style.height = '100%';
        } else {
            view.style.width = '100%';
            view.style.height = 'auto';
        }
    }

    document.body.appendChild(app.view as HTMLCanvasElement);

    const statusDiv = document.getElementById('text');

    if (statusDiv) {
        statusDiv.innerText = t(TrKey.pressAnyButton).toUpperCase();
        statusDiv.classList.add('blink');
    }

    pressAnyButton(() => {
        document.getElementById('splashscreen')?.remove();
    });

    createFPSStat(app);
});
