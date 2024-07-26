/**
 * Render html string
 * @param html - html string
 * @returns {{refs: {}, element: Element}}
 */
export default (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const { firstElementChild: element } = doc.body;

    const refs = {};

    if (element) {
        doc.body.querySelectorAll('[ref]').forEach((el) => {
            refs[el.getAttribute('ref')] = el;
            el.removeAttribute('ref');
        });
    }

    return { refs, element };
};
