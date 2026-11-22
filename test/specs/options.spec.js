import GuideChimp from '../../src/GuideChimp';

describe('GuideChimp construction', () => {
    it('stores the tour and returns it from getTour', () => {
        const tour = [{ title: 'one' }];
        const guideChimp = new GuideChimp(tour);

        expect(guideChimp.getTour()).toBe(tour);
    });

    it('accepts a tour name as a string', () => {
        expect(new GuideChimp('welcome').getTour()).toBe('welcome');
    });

    it('starts with no current step and nothing displayed', () => {
        const guideChimp = new GuideChimp([]);

        expect(guideChimp.isDisplayed).toBe(false);
        expect(guideChimp.steps).toEqual([]);
        expect(guideChimp.currentStep).toBeNull();
        expect(guideChimp.previousStep).toBeNull();
        expect(guideChimp.nextStep).toBeNull();
        expect(guideChimp.fromStep).toBeNull();
        expect(guideChimp.toStep).toBeNull();
        expect(guideChimp.currentStepIndex).toBe(-1);
        expect(guideChimp.previousStepIndex).toBe(-1);
        expect(guideChimp.nextStepIndex).toBe(-1);
        expect(guideChimp.fromStepIndex).toBe(-1);
        expect(guideChimp.toStepIndex).toBe(-1);
        expect(guideChimp.notifications).toEqual([]);
    });

    it('gives each instance a unique, read-only, non-enumerable uid', () => {
        const a = new GuideChimp([]);
        const b = new GuideChimp([]);

        expect(a.uid).toBeDefined();
        expect(a.uid).not.toBe(b.uid);
        expect(Object.keys(a)).not.toContain('uid');

        const { uid } = a;
        expect(() => { a.uid = 'changed'; }).toThrow(TypeError);
        expect(() => Object.defineProperty(a, 'uid', { value: 'x' })).toThrow(TypeError);
        expect(a.uid).toBe(uid);
    });

    it('keeps listeners in an object without a prototype', () => {
        const guideChimp = new GuideChimp([]);

        expect(Object.getPrototypeOf(guideChimp.listeners)).toBeNull();
    });

    it('calls the init hook once, after options and tour are set', () => {
        const seen = [];

        class Custom extends GuideChimp {
            init() {
                seen.push({ tour: this.getTour(), position: this.getOptions().position });
            }
        }

        const tour = [{ title: 'x' }];
        const instance = new Custom(tour, { position: 'top' });

        expect(seen).toEqual([{ tour, position: 'top' }]);
        expect(instance).toBeInstanceOf(GuideChimp);
    });

    it('setDefaults resets step state and returns the instance', () => {
        const guideChimp = new GuideChimp([]);
        guideChimp.currentStep = { step: 3 };
        guideChimp.currentStepIndex = 3;
        guideChimp.isDisplayed = true;
        guideChimp.steps = [{ step: 3 }];

        expect(guideChimp.setDefaults()).toBe(guideChimp);
        expect(guideChimp.currentStep).toBeNull();
        expect(guideChimp.currentStepIndex).toBe(-1);
        expect(guideChimp.isDisplayed).toBe(false);
        expect(guideChimp.steps).toEqual([]);
    });
});

describe('GuideChimp options', () => {
    it('applies the documented defaults', () => {
        const options = new GuideChimp([]).getOptions();

        expect(options).toMatchObject({
            position: 'bottom',
            useKeyboard: true,
            exitEscape: true,
            exitOverlay: true,
            showPagination: true,
            showNavigation: true,
            showProgressbar: true,
            interaction: true,
            padding: 8,
            scrollPadding: 10,
            scrollBehavior: 'auto',
            pagination: {
                theme: 'circles',
                circles: { maxItems: 10 },
                numbers: { delimiter: '...', visibleSteps: 5 },
            },
        });
    });

    it('provides a template function for every part of the UI', () => {
        const { templates } = GuideChimp.getDefaultOptions();

        expect(Object.keys(templates).sort()).toEqual([
            'close', 'control', 'copyright', 'customButtons', 'description', 'fakeStep',
            'interaction', 'next', 'notification', 'overlay', 'pagination', 'preloader',
            'previous', 'progressbar', 'title', 'tooltip',
        ]);
        Object.values(templates).forEach((template) => expect(typeof template).toBe('function'));
    });

    it('overrides defaults with user options and deep-merges nested ones', () => {
        const options = new GuideChimp([], {
            position: 'top',
            useKeyboard: false,
            pagination: { theme: 'numbers', numbers: { visibleSteps: 3 } },
        }).getOptions();

        expect(options.position).toBe('top');
        expect(options.useKeyboard).toBe(false);
        expect(options.pagination.theme).toBe('numbers');
        expect(options.pagination.numbers).toEqual({ delimiter: '...', visibleSteps: 3 });
        expect(options.pagination.circles).toEqual({ maxItems: 10 });
    });

    it('lets a user replace a single template and keeps the other defaults', () => {
        const title = () => 'custom title';
        const { templates } = new GuideChimp([], { templates: { title } }).getOptions();

        expect(templates.title).toBe(title);
        expect(templates.tooltip).toBe(GuideChimp.getDefaultOptions().templates.tooltip);
    });

    it('does not mutate the options object passed in', () => {
        const input = { position: 'left', pagination: { theme: 'numbers' } };
        const snapshot = JSON.parse(JSON.stringify(input));

        new GuideChimp([], input);

        expect(input).toEqual(snapshot);
    });

    it('does not share state between instances', () => {
        const a = new GuideChimp([]);
        const b = new GuideChimp([]);

        a.getOptions().pagination.circles.maxItems = 99;

        expect(b.getOptions().pagination.circles.maxItems).toBe(10);
        expect(GuideChimp.getDefaultOptions().pagination.circles.maxItems).toBe(10);
    });

    it('setOptions replaces earlier options with defaults plus the new ones, not a merge with the old ones', () => {
        const guideChimp = new GuideChimp([], { position: 'top' });

        expect(guideChimp.setOptions({ padding: 20 })).toBe(guideChimp);
        expect(guideChimp.getOptions().padding).toBe(20);
        expect(guideChimp.getOptions().position).toBe('bottom');
    });

    it('setTour replaces the tour and returns the instance', () => {
        const guideChimp = new GuideChimp('a');

        expect(guideChimp.setTour('b')).toBe(guideChimp);
        expect(guideChimp.getTour()).toBe('b');
    });
});

describe('GuideChimp options and prototype pollution', () => {
    afterEach(() => {
        delete Object.prototype.polluted;
    });

    it('ignores a __proto__ key in user options', () => {
        const malicious = JSON.parse('{"__proto__": {"polluted": true}}');

        new GuideChimp([], malicious);

        expect({}.polluted).toBeUndefined();
        expect(Object.prototype.polluted).toBeUndefined();
    });

    it('ignores a constructor.prototype path in user options', () => {
        const malicious = JSON.parse('{"constructor": {"prototype": {"polluted": true}}}');

        new GuideChimp([], malicious);

        expect({}.polluted).toBeUndefined();
        expect(Object.prototype.polluted).toBeUndefined();
    });

    it('ignores a nested __proto__ key', () => {
        const malicious = JSON.parse('{"pagination": {"__proto__": {"polluted": true}}}');

        new GuideChimp([], malicious);

        expect({}.polluted).toBeUndefined();
    });
});
