export function getViewportSize(): Promise<Point> {
    const div = document.createElement('div');

    div.id = 'fixedDiv';
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.right = '0';
    div.style.left = '0';
    div.style.bottom = '0';

    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            document.body.appendChild(div);

            requestAnimationFrame(() => {
                const { width, height } = div.getBoundingClientRect();

                resolve([width, height]);

                div.remove();
            });
        });
    });
}
