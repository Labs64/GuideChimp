export default (el) => (el instanceof HTMLElement || /^\[object HTML(.+)Element\]$/.test(`${el}`));
