import DOMPurify from 'dompurify';

/**
 * Sanitize HTML from tour data before it reaches the page.
 * @param html
 * @returns {string}
 */
export default (html = '') => DOMPurify.sanitize(html);
