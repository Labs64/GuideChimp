export default class GuideChimp {
    /**
     * Initialize GuideChimp.
     * @param {Object} tour tour steps
     * @param {Object} options tour options
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
     * Set all tour options.
     * @param {Object} options objects of options.
     * @returns {this}
     */
    setOptions(options) {
        this.options = { ...options };
        return this;
    }

    /**
     * Create a copy of the tour.
     * @returns {this}
     */
    clone() {
        return new GuideChimp(this.getTour(), this.options);
    }
}
