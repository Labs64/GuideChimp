import render from '../utils/render';

export default ({ path, stop }) => {
    const { element: overlay } = render(`
        <div class="gc-overlay">
            <svg class="svg-overlay">
                <path d="${path}">
                    <animate attributeName="d"
                       dur="200ms" />
                </path>
            </svg>
        </div>
    `);

    overlay.addEventListener('click', (e) => {
        stop(e);
    });

    return overlay;
};
