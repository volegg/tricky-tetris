export function pressAnyButton(callback: () => void) {
    window.addEventListener('click', handler);
    window.addEventListener('keydown', handler);

    function handler() {
        callback();
        window.removeEventListener('click', handler);
        window.removeEventListener('keydown', handler);
    }
}
