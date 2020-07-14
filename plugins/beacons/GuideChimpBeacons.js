import GuideChimp from '@/GuideChimp';
import Beacons from './Beacons';

export default class GuideChimpBeacons extends Beacons {
    getDataBeacons(ids) {
        const beacons = super.getDataBeacons(ids);

        beacons.forEach((beacon) => {
            const { id, element: el } = beacon;

            let tour = '';

            const dataGlobalTourAttrName = `${this.constructor.getBeaconDataPrefix()}-tour`;
            const dataBeaconTourAttrName = `${this.constructor.getBeaconDataPrefix()}-${id}-tour`;

            if (el.attributes[dataGlobalTourAttrName]) {
                const { value } = el.attributes[dataGlobalTourAttrName];
                tour = value;
            }

            if (el.attributes[dataBeaconTourAttrName]) {
                const { value } = el.attributes[dataBeaconTourAttrName];
                tour = value;
            }

            if (tour) {
                // eslint-disable-next-line no-param-reassign
                beacon.tour = tour;
            }
        });

        return beacons;
    }

    createBeaconEl(beacon) {
        const beaconEl = super.createBeaconEl(beacon);

        if (beacon.tour) {
            beaconEl.addEventListener('click', () => {
                let guide = null;

                if (typeof beacon.tour === 'string' || Array.isArray(beacon.tour)) {
                    guide = new GuideChimp(beacon.tour);
                } else if (beacon.tour instanceof GuideChimp) {
                    guide = beacon.tour;
                } else if (typeof beacon.tour === 'object') {
                    const { steps, options } = beacon;
                    guide = new GuideChimp(steps, options);
                }

                if (guide) {
                    this.hide(beacon);

                    guide.on('onStop', () => {
                        this.show(beacon);
                    });

                    guide.start();
                }
            });
        }

        return beaconEl;
    }
}
