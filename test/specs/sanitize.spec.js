// @vitest-environment jsdom
import GuideChimp from '../../src/GuideChimp';
import sanitize from '../../src/utils/sanitize';
import descriptionTmpl from '../../src/templates/description';

describe('sanitize', () => {
    it('keeps harmless formatting used by published tours', () => {
        expect(sanitize('a <b>bold</b><br>line')).toBe('a <b>bold</b><br>line');
    });

    it('strips event handlers, scripts and javascript: urls', () => {
        expect(sanitize('<img src="x" onerror="alert(1)">')).not.toContain('onerror');
        expect(sanitize('<script>alert(1)</script>')).toBe('');
        expect(sanitize('<a href="javascript:alert(1)">x</a>')).not.toContain('javascript:');
    });
});

describe('step HTML', () => {
    const createInstance = (step) => {
        const guideChimp = Object.create(GuideChimp.prototype);
        guideChimp.uid = 'test';
        guideChimp.currentStep = step;
        guideChimp.options = { templates: { description: descriptionTmpl } };
        return guideChimp;
    };

    it('sanitizes the description before the template renders it', () => {
        const el = createInstance({ description: '<img src="x" onerror="alert(1)"><b>ok</b>' })
            .createDescriptionEl();

        expect(el.querySelector('img').getAttribute('onerror')).toBeNull();
        expect(el.innerHTML).toContain('<b>ok</b>');
    });
});
