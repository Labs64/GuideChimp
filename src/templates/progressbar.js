import render from '../utils/render';

/**
 * Progressbar template
 * @param showProgressbar
 * @param progressMin
 * @param progressMax
 * @param progress
 * @returns {null|Element}
 */
export default ({ showProgressbar, progressMin, progressMax, progress }) => {
    if (showProgressbar) {
        return render(` 
            <div class="gc-progressbar"
                 role="progressbar"
                 aria-valuemin="${progressMin}"
                 aria-valuemax="${progressMax}"
                 aria-valuenow="${progress}"
                 style="width:${progress}%;"
            />`).element;
    }

    return null;
};
