import GuideChimp from '../../src/GuideChimp';

describe('GuideChimp event listeners', () => {
    let guideChimp;

    beforeEach(() => {
        guideChimp = new GuideChimp([]);
    });

    it('registers listeners and emits arguments with the GuideChimp instance as this', async () => {
        const listener = vi.fn(function listener(...args) {
            expect(this).toBe(guideChimp);
            return args.join(' ');
        });

        expect(guideChimp.on('customEvent', listener)).toBe(guideChimp);
        await expect(guideChimp.emit('customEvent', 'hello', 'world')).resolves.toEqual(['hello world']);
        expect(listener).toHaveBeenCalledOnce();
    });

    it('supports event names that exist on Object.prototype without modifying it', async () => {
        const originalProperties = Object.getOwnPropertyNames(Object.prototype);
        const listener = vi.fn();

        guideChimp.on('__proto__', listener);
        await guideChimp.emit('__proto__');

        expect(listener).toHaveBeenCalledOnce();
        expect(Object.getOwnPropertyNames(Object.prototype)).toEqual(originalProperties);
    });

    it('emits listeners from highest to lowest priority', async () => {
        const calls = [];

        guideChimp.on('customEvent', () => calls.push('low'), { priority: 'low' });
        guideChimp.on('customEvent', () => calls.push('high'), { priority: 'high' });
        guideChimp.on('customEvent', () => calls.push('critical'), { priority: 'critical' });

        await guideChimp.emit('customEvent');

        expect(calls).toEqual(['critical', 'high', 'low']);
    });
});
