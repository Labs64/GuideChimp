import render from '@/utils/render';

export default ({ beacon }) => {
    const { element } = render(`<div class="gc-beacon ${beacon.class}" />`);
    element.addEventListener('click', (e) => {
        beacon.onClick(e);
    });

    return element;
};
