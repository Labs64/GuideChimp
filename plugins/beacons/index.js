/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */
import Beacons from './Beacons';
import './assets/style.scss';

module.exports = (Class, factory) => {
    // eslint-disable-next-line no-param-reassign
    factory.beacons = (beacons, options = {}) => new class extends Beacons {
        getDataBeacons(ids) {
            const data = super.getDataBeacons(ids);

            data.forEach((beacon) => {
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

            return data;
        }

        createBeaconEl(beacon) {
            const el = super.createBeaconEl(beacon);

            if (beacon.tour) {
                el.addEventListener('click', () => {
                    let guide = null;

                    if (typeof beacon.tour === 'string' || Array.isArray(beacon.tour)) {
                        guide = new Class(beacon.tour);
                    } else if (beacon.tour instanceof Class) {
                        guide = beacon.tour;
                    } else if (typeof beacon.tour === 'object') {
                        const { steps, options: tourOptions } = beacon.tour;
                        guide = new Class(steps, tourOptions);
                    }

                    if (guide) {
                        guide.start();
                    }
                });
            }

            return el;
        }
    }(beacons, options);
};
