import render from '../utils/render';

/**
 * Pagination template
 * @param data
 * @returns {Element|null}
 */
export default (data) => {
    const {
        showPagination,
        steps,
        pagination,
        currentStepIndex,
        previousStepIndex,
        nextStepIndex,
        previous,
        next,
        go,
    } = data;

    if (showPagination && steps.length > 1) {
        const { theme, circles: circlesTheme, numbers: numbersTheme } = pagination;

        const isNumberTheme = (theme === 'numbers' || steps.length >= circlesTheme.maxItems);

        const total = steps.length;
        const lastIndex = total - 1;

        const { element: paginationEl } = render('<div class="gc-pagination" />');

        const createPaginationItem = (tag, index, text = '') => {
            const { element: li } = render(`<${tag} class="gc-pagination-item">${text}</${tag}>`);

            if (index === previousStepIndex) {
                li.classList.add('gc-pagination-item-previous');

                li.addEventListener('click', (e) => {
                    previous(e);
                });
            } else if (index === nextStepIndex) {
                li.classList.add('gc-pagination-item-next');

                li.addEventListener('click', (e) => {
                    next(e);
                });
            } else {
                if (index === currentStepIndex) {
                    li.classList.add('gc-pagination-item-current', 'gc-pagination-active');
                }

                li.addEventListener('click', (e) => {
                    go(index, true, e);
                });
            }
            return li;
        };

        if (isNumberTheme) {
            const { element: ul } = render('<ul class="gc-pagination-theme-numbers" />');

            const half = Math.floor(numbersTheme.visibleSteps / 2);

            let start = currentStepIndex - half;

            if (lastIndex - currentStepIndex < half) {
                start = lastIndex - numbersTheme.visibleSteps;
            }

            let end = currentStepIndex + half;

            if (end < numbersTheme.visibleSteps - 1) {
                end = numbersTheme.visibleSteps - 1;
            }

            for (let i = 0; i < steps.length;) {
                if (i > 0 && i < steps.length - 1) {
                    if ((i < start) || (i > end)) {
                        ul.append(render(`<li class="gc-pagination-dots">${numbersTheme.delimiter}</li>`).element);

                        i = (i < start) ? start : steps.length - 1;

                        // eslint-disable-next-line no-continue
                        continue;
                    }
                }

                ul.append(createPaginationItem('li', i, String(i + 1)));

                i += 1;
            }

            paginationEl.append(ul);
        } else {
            const { element: ul } = render('<div class="gc-pagination-theme-circles" />');

            steps.forEach((v, i) => {
                ul.append(createPaginationItem('div', i));
            });

            paginationEl.append(ul);
        }

        return paginationEl;
    }

    return null;
};
