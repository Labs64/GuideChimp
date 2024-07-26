import render from '../utils/render';

/**
 * Tooltip template
 * @param progressbar {Element|null}
 * @param title {Element|null}
 * @param description {Element|null}
 * @param close {Element|null}
 * @param customButtons {Element|null}
 * @param previous {Element|null}
 * @param pagination {Element|null}
 * @param next {Element|null}
 * @param copyright {Element|null}
 * @param notification {Element|null}
 * @returns {Element|*}
 */
export default ({
    progressbar,
    title,
    description,
    close,
    customButtons,
    previous,
    pagination,
    next,
    copyright,
    notification,
}) => {
    const { element: tooltip } = render(`
        <div class="gc-tooltip">
            <div class="gc-tooltip-tail">
        </div>
    `);

    if (progressbar) {
        tooltip.append(progressbar);
    }

    if (title) {
        tooltip.append(title);
    }

    if (description) {
        tooltip.append(description);
    }

    if (close) {
        tooltip.append(close);
    }

    if (customButtons) {
        tooltip.append(customButtons);
    }

    if (previous || pagination || next) {
        const { element: nav } = render('<div class="gc-navigation" />');

        if (previous) {
            nav.append(previous);
        }

        if (pagination) {
            nav.append(pagination);
        }

        if (next) {
            nav.append(next);
        }

        tooltip.append(nav);
    }

    if (copyright) {
        tooltip.append(copyright);
    }

    if (notification) {
        tooltip.append(notification);
    }

    return tooltip;
};
