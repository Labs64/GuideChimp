import render from '../utils/render';

export default ({ messages }) => {
    if (messages.length) {
        return render(`<div class="gc-notification">${messages[0]}</div>`).element;
    }

    return null;
};
