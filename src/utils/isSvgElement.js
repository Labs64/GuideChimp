export default (el) => (el instanceof SVGElement || /^\[object SVG(.+)Element\]$/.test(`${el}`));
