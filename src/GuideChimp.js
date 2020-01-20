export default class GuideChimp {
    /**
     *
     * @param {Object} tour excursion tour steps
     * @param {Object} options objects of options
     */
    constructor(tour, options = {}) {
        this.currentStep = null;
        this.currentStepNumber = 0;
        this.options = {};
        this.tour = {};

        // events listeners
        this.listeners = [];

        // set options
        this.setOptions(options);

        // set tour
        this.setTour(tour);

        this.boot();
    }

    /**
     * Called after construction, this hook allows you to add some extra setup
     * logic without having to override the constructor
     */
    // eslint-disable-next-line class-methods-use-this
    boot() {
    }

    /**
     * Set tour.
     * @param tour excursion tour steps.
     * @returns {GuideChimp}
     */
    setTour(tour) {
        this.tour = { ...tour };
        return this;
    }

    /**
     * Get tour.
     * @returns {Object}
     */
    getTour() {
        return this.tour;
    }

    /**
     * Sets all given options.
     * @param {Object} options objects of options.
     * @returns {this}
     */
    setOptions(options) {
        this.options = { ...options };
        return this;
    }

    /**
     * Creates a copy of this excursion, with the same tour and options.
     * @returns {this}
     */
    clone() {
        return new GuideChimp(this.getTour(), this.options);
    }
}
