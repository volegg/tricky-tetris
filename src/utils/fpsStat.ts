import type { Application } from 'pixi.js';

export function createFPSStat(app: Application) {
    const msUpdateFps = 50;
    const div = document.createElement('div');

    div.style.position = 'fixed';
    div.style.fontFamily = 'Arial';
    div.style.top = '0';
    div.style.left = '0';
    div.style.color = '#ffffff';
    div.style.padding = '2px';
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    document.body.appendChild(div);

    let diff = 0;
    let prevFps = 0;

    app.ticker.add((delta) => {
        diff += delta;

        if (diff > msUpdateFps && diff !== prevFps) {
            diff = 0;
            prevFps = app.ticker.FPS >> 0;
            div.innerText = '' + prevFps + ' fps';
        } else {
            prevFps = app.ticker.FPS;
        }
    });
}
