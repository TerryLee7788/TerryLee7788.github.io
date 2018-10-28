require('../../scss/components/_slider.scss');
require('../../scss/pages/_slider.scss');

import { slider } from '../components/_slider.js';

(() => {

    slider({
        elem: document.querySelector('.t-slider'),
    });

})();
