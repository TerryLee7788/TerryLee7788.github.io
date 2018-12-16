import { scrollBottom } from '../components/_scrollBottom.js';
require('../../scss/components/_scrollBottom.scss');

{

    scrollBottom({
        callback: () => {

            console.log('靠近底部囉!');

        },
    });

}

