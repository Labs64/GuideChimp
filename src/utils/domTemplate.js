/**
 * Lodash
 * @see https://lodash.com/docs
 */
import _isUndefined from 'lodash/isUndefined';
import _isNull from 'lodash/isNull';

// utils
import isHtmlElement from './isHtmlElement';
import isSvgElement from './isSvgElement';
import isNodeList from './isNodeList';

export default (tpl, data = {}) => {
    const parser = new DOMParser();

    let template = tpl.replace(/<template/g, '<gc-template');
    template = template.replace(/<\/template/g, '</gc-template');

    const sourceDoc = parser.parseFromString(template, 'text/html');
    const renderedDoc = document.implementation.createHTMLDocument();

    const pattern = /{{([^}}]+)?}}/gm;
    const eventPattern = /^@(.+)$/;

    const ifEnded = new Map();

    const render = (node, replacements = {}, parent = renderedDoc.body) => {
        let handler = parent;

        const keys = Object.keys(replacements);
        const values = Object.values(replacements);

        // eslint-disable-next-line no-new-func
        const getValue = (key) => (new Function(...keys, `return ${key};`))(...values);

        if (node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.hasAttribute('if')) {
                    ifEnded.set(node.parentNode, false);

                    if (!getValue(node.getAttribute('if'))) {
                        return;
                    }

                    ifEnded.set(node.parentNode, true);
                }

                if (node.hasAttribute('elseif')) {
                    if (ifEnded.get(node.parentNode) || !getValue(node.getAttribute('elseif'))) {
                        return;
                    }

                    ifEnded.set(node.parentNode, true);
                }

                if (node.hasAttribute('else')) {
                    if (ifEnded.get(node.parentNode)) {
                        return;
                    }

                    ifEnded.set(node.parentNode, true);
                }

                if (node.hasAttribute('for')) {
                    const forPieces = node.getAttribute('for').split(' in ');
                    const [firstPiece, secondPiece] = forPieces;

                    node.removeAttribute('for');

                    let [param, index] = firstPiece.replace(/\(|\)/g, '').split(',');
                    param = param.trim();
                    index = (index) ? index.trim() : '';

                    const source = getValue(secondPiece.trim());

                    const isSourceArray = Array.isArray(source);

                    Object.keys(source).forEach((k) => {
                        const r = { ...replacements, [param]: source[k] };

                        if (index) {
                            r[index] = (isSourceArray) ? parseInt(k, 10) : k;
                        }

                        render(node, r, handler);
                    });

                    return;
                }

                if (node !== node.ownerDocument.body && node.tagName !== 'GC-TEMPLATE') {
                    handler = node.cloneNode();
                    parent.append(handler);
                }

                [...node.attributes].forEach((attr) => {
                    const { name, value } = attr;

                    const eventMatch = eventPattern.exec(name);

                    if (eventMatch) {
                        const [, eventName] = eventMatch;

                        // eslint-disable-next-line no-new-func
                        handler.addEventListener(eventName, (e) => new Function(
                            ...[...keys, '$event'],
                            `return ${value}${(/\(.+\)/.test(value)) ? '' : '()'};`,
                        )(...[...values, e]));

                        handler.removeAttribute(name);

                        return;
                    }

                    let match = pattern.exec(value);
                    let index = 0;
                    let rValue = '';

                    while (match) {
                        rValue += value.slice(index, match.index);

                        let [replacement, key] = match;
                        key = key.trim();

                        try {
                            replacement = getValue(key);

                            if (_isUndefined(replacement) || _isNull(replacement)) {
                                replacement = '';
                            }
                        } catch (e) {
                            // eslint-disable-next-line no-console
                            console.error(e);
                        }

                        rValue += replacement;

                        index = match.index + match[0].length;
                        match = pattern.exec(value);
                    }

                    rValue += value.substr(index, value.length - index);

                    if (name === 'html') {
                        handler.innerHTML = rValue;
                        handler.removeAttribute(name);
                    } else if (['if', 'else', 'elseif'].includes(name)) {
                        handler.removeAttribute(name);
                    } else {
                        handler.setAttribute(name, rValue);
                    }
                });
            } else if (node.nodeType === Node.TEXT_NODE) {
                let match = pattern.exec(node.nodeValue);

                if (match) {
                    let index = 0;
                    while (match) {
                        handler.append(document.createTextNode(node.nodeValue.slice(index, match.index)));

                        let [replacement, key] = match;
                        key = key.trim();

                        try {
                            replacement = getValue(key);

                            if (_isUndefined(replacement) || _isNull(replacement)) {
                                replacement = '';
                            }
                        } catch (e) {
                            // eslint-disable-next-line no-console
                            console.error(e);
                        }

                        if (isHtmlElement(replacement) || isSvgElement(replacement)) {
                            handler.append(replacement);
                        } else if (isNodeList(replacement)) {
                            replacement.forEach((v) => {
                                handler.append(v);
                            });
                        } else {
                            handler.append(document.createTextNode(replacement));
                        }

                        index = match.index + match[0].length;
                        match = pattern.exec(node.nodeValue);
                    }

                    handler.append(document.createTextNode(node.nodeValue.slice(index, node.nodeValue.length)));
                } else {
                    handler.append(node.cloneNode());
                }
            }

            const { childNodes = [] } = node;

            if (childNodes.length) {
                childNodes.forEach((v) => {
                    render(v, replacements, handler);
                });
            }
        }
    };

    render(sourceDoc.body, data, renderedDoc.body);

    return renderedDoc.body.firstElementChild;
};
