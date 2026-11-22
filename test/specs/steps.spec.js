import GuideChimp from '../../src/GuideChimp';

const addStepEl = (attrs = {}, tag = 'div') => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, value));
    document.body.appendChild(el);
    return el;
};

afterEach(() => {
    document.body.replaceChildren();
});

describe('GuideChimp.getSteps', () => {
    it('returns an empty list for a missing or empty tour', () => {
        const guideChimp = new GuideChimp([]);

        expect(guideChimp.getSteps(undefined)).toEqual([]);
        expect(guideChimp.getSteps(null)).toEqual([]);
        expect(guideChimp.getSteps('')).toEqual([]);
        expect(guideChimp.getSteps([])).toEqual([]);
    });

    it('treats an object without a length as no steps', () => {
        expect(new GuideChimp([]).getSteps({ title: 'not an array' })).toEqual([]);
    });

    it('reads steps from the DOM when the tour is a name', () => {
        addStepEl({ 'data-guidechimp-tour': 'welcome', 'data-guidechimp-title': 'Hi' });
        const guideChimp = new GuideChimp('welcome');

        const steps = guideChimp.getSteps('welcome');

        expect(steps).toHaveLength(1);
        expect(steps[0].title).toBe('Hi');
    });

    it('uses the steps array as given when the tour is an array', () => {
        const guideChimp = new GuideChimp([]);
        const steps = guideChimp.getSteps([{ title: 'a' }, { title: 'b' }]);

        expect(steps.map((s) => s.title)).toEqual(['a', 'b']);
    });
});

describe('GuideChimp.getJsSteps', () => {
    const guideChimp = new GuideChimp([]);

    it('numbers steps by their position when no step is given', () => {
        const steps = guideChimp.getJsSteps([{ title: 'a' }, { title: 'b' }, { title: 'c' }]);

        expect(steps.map((s) => s.step)).toEqual([0, 1, 2]);
    });

    it('keeps an explicit step number', () => {
        const steps = guideChimp.getJsSteps([{ title: 'a', step: 5 }, { title: 'b', step: 2 }]);

        expect(steps.map((s) => s.step)).toEqual([5, 2]);
    });

    it('copies each step instead of mutating the input', () => {
        const input = [{ title: 'a' }];

        const [step] = guideChimp.getJsSteps(input);

        expect(step).not.toBe(input[0]);
        expect(input[0]).toEqual({ title: 'a' });
    });

    it('preserves every other step property', () => {
        const element = '#target';
        const [step] = guideChimp.getJsSteps([{ title: 't', description: 'd', element, position: 'left' }]);

        expect(step).toMatchObject({ title: 't', description: 'd', element, position: 'left', step: 0 });
    });

    // Characterises current behaviour: step 0 is falsy, so an explicit `step: 0`
    // on a later entry is replaced by its array index.
    it('replaces an explicit step 0 by the array index (current behaviour)', () => {
        const steps = guideChimp.getJsSteps([{ title: 'a', step: 1 }, { title: 'b', step: 0 }]);

        expect(steps.map((s) => s.step)).toEqual([1, 1]);
    });
});

describe('GuideChimp.getDataSteps', () => {
    it('returns an empty list when no element belongs to the tour', () => {
        addStepEl({ 'data-guidechimp-tour': 'other' });

        expect(new GuideChimp('welcome').getDataSteps('welcome')).toEqual([]);
    });

    it('builds a step per element with defaults taken from the options', () => {
        const el = addStepEl({ 'data-guidechimp-tour': 'welcome' });
        const guideChimp = new GuideChimp('welcome', { position: 'right', interaction: false });

        const [step] = guideChimp.getDataSteps('welcome');

        expect(step).toMatchObject({
            step: 0,
            title: '',
            description: '',
            position: 'right',
            interaction: false,
        });
        expect(step.element).toBe(el);
    });

    it('numbers steps in document order', () => {
        addStepEl({ 'data-guidechimp-tour': 'welcome' });
        addStepEl({ 'data-guidechimp-tour': 'welcome' });
        addStepEl({ 'data-guidechimp-tour': 'welcome' });

        const steps = new GuideChimp('welcome').getDataSteps('welcome');

        expect(steps.map((s) => s.step)).toEqual([0, 1, 2]);
    });

    it('reads global attributes (data-guidechimp-*) as step properties', () => {
        addStepEl({
            'data-guidechimp-tour': 'welcome',
            'data-guidechimp-title': 'Title',
            'data-guidechimp-description': 'Desc',
            'data-guidechimp-position': 'top',
        });

        const [step] = new GuideChimp('welcome').getDataSteps('welcome');

        expect(step).toMatchObject({ title: 'Title', description: 'Desc', position: 'top' });
    });

    it('does not expose the tour attribute as a step property', () => {
        addStepEl({ 'data-guidechimp-tour': 'welcome' });

        const [step] = new GuideChimp('welcome').getDataSteps('welcome');

        expect(step).not.toHaveProperty('tour');
    });

    it('lets a tour-specific attribute override the global one', () => {
        addStepEl({
            'data-guidechimp-tour': 'welcome',
            'data-guidechimp-title': 'Global',
            'data-guidechimp-welcome-title': 'Specific',
        });

        const [step] = new GuideChimp('welcome').getDataSteps('welcome');

        expect(step.title).toBe('Specific');
    });

    it('ignores attributes that are specific to another tour', () => {
        addStepEl({
            'data-guidechimp-tour': 'welcome',
            'data-guidechimp-other-title': 'Not mine',
        });

        const [step] = new GuideChimp('welcome').getDataSteps('welcome');

        expect(step.title).toBe('');
    });

    it('lets one element belong to several comma-separated tours', () => {
        addStepEl({ 'data-guidechimp-tour': 'a,welcome,b' });

        expect(new GuideChimp('welcome').getDataSteps('welcome')).toHaveLength(1);
        expect(new GuideChimp('a').getDataSteps('a')).toHaveLength(1);
    });

    it('does not match a tour whose name is only part of another name', () => {
        addStepEl({ 'data-guidechimp-tour': 'welcome-back' });

        expect(new GuideChimp('welcome').getDataSteps('welcome')).toEqual([]);
    });

    // Characterises current behaviour: the filter compares against the
    // instance tour (this.tour), not the tour name passed in.
    it('filters by the instance tour, not by the argument (current behaviour)', () => {
        addStepEl({ 'data-guidechimp-tour': 'welcome' });
        const guideChimp = new GuideChimp('another');

        expect(guideChimp.getDataSteps('welcome')).toEqual([]);
    });
});

describe('GuideChimp.sortSteps', () => {
    const guideChimp = new GuideChimp([]);

    it('sorts ascending by step number', () => {
        const sorted = guideChimp.sortSteps([{ step: 2 }, { step: 0 }, { step: 1 }]);

        expect(sorted.map((s) => s.step)).toEqual([0, 1, 2]);
    });

    it('does not mutate the input list', () => {
        const input = [{ step: 2 }, { step: 1 }];

        guideChimp.sortSteps(input);

        expect(input.map((s) => s.step)).toEqual([2, 1]);
    });

    it('keeps the original order of steps with equal numbers', () => {
        const sorted = guideChimp.sortSteps([
            { step: 1, id: 'a' }, { step: 0, id: 'b' }, { step: 1, id: 'c' },
        ]);

        expect(sorted.map((s) => s.id)).toEqual(['b', 'a', 'c']);
    });

    it('returns an empty list for no steps', () => {
        expect(guideChimp.sortSteps([])).toEqual([]);
    });

    // Characterises current behaviour: step numbers read from data attributes
    // are strings, and two strings compare lexicographically.
    it('orders two numeric strings lexicographically (current behaviour)', () => {
        const sorted = guideChimp.sortSteps([{ step: '2' }, { step: '10' }]);

        expect(sorted.map((s) => s.step)).toEqual(['10', '2']);
    });
});

describe('GuideChimp.getStepEl', () => {
    it('returns the element when the step holds an element', () => {
        const el = addStepEl();

        expect(new GuideChimp([]).getStepEl({ element: el })).toBe(el);
    });

    it('finds the element by selector', () => {
        const el = addStepEl({ id: 'target' });

        expect(new GuideChimp([]).getStepEl({ element: '#target' })).toBe(el);
    });

    it('falls back to the fake step element when the step has no element', () => {
        const guideChimp = new GuideChimp([]);

        const el = guideChimp.getStepEl({ title: 'no element' });

        expect(el).toBeInstanceOf(HTMLElement);
        expect(guideChimp.getEl('fakeStep')).toBe(el);
    });

    it('falls back to the fake step element when the selector matches nothing', () => {
        const guideChimp = new GuideChimp([]);

        const el = guideChimp.getStepEl({ element: '#missing' });

        expect(guideChimp.getEl('fakeStep')).toBe(el);
    });

    it('falls back to the fake step element when the element is display:none', () => {
        const hidden = addStepEl();
        hidden.style.display = 'none';
        const guideChimp = new GuideChimp([]);

        expect(guideChimp.getStepEl({ element: hidden })).not.toBe(hidden);
    });

    it('falls back to the fake step element when the element is visibility:hidden', () => {
        const hidden = addStepEl();
        hidden.style.visibility = 'hidden';
        const guideChimp = new GuideChimp([]);

        expect(guideChimp.getStepEl({ element: hidden })).not.toBe(hidden);
    });

    it('reuses one fake step element across calls', () => {
        const guideChimp = new GuideChimp([]);

        const first = guideChimp.getStepEl({ element: '#missing' });
        const second = guideChimp.getStepEl({ element: '#also-missing' });

        expect(second).toBe(first);
    });
});
