/*****
 * API DOC:
 * @author: terry
 * @parameter opts {Object}
 *     @property elem {Element} - The 'slider-container' parent DOM Element.
 *     @property with_btns {boolean} (default: true) - Add 'next' and 'previous' buttons.
 *     @property with_dots {boolean} (default: true) - Add 'dot' bar
 *****/

const slider = (opts) => {

    const SETTINGS = {
            AUTO_START: true,
            SWIPE: false,
            TIME_INTERVAL: 4000,
            TYPE: 'transform',
            CURRENT_POINT: 1,
            MAX_COUNT: 0,
            LOCK_ANIMATE: false,
            ANIMATE_DURATION: 500,
            REGENERATE_TIME: 600,
            VERSION: '1.0.0',
            WITH_DOTS: true,
            WITH_BTNS: true,
        },
        PRIVATE_METHODS = {
            ACTIVE_DURATION: () => {

                CONTAINER.style.transitionDuration = '.5s';

            },
            MOUSE_OVER: () => {

                PRIVATE_METHODS.STOP();

            },
            MOUSE_OUT: () => {

                PRIVATE_METHODS.START();

            },
            NEXT: () => {

                if (!SETTINGS.LOCK_ANIMATE) {

                    ++SETTINGS.CURRENT_POINT;
                    PRIVATE_METHODS.ANIMATE_ITEM(SETTINGS.CURRENT_POINT);

                }

            },
            PREVIOUS: () => {

                if (!SETTINGS.LOCK_ANIMATE) {

                    --SETTINGS.CURRENT_POINT;
                    PRIVATE_METHODS.ANIMATE_ITEM(SETTINGS.CURRENT_POINT);

                }

            },
            SET_ITEM: (index) => {

                if (!SETTINGS.LOCK_ANIMATE) {

                    SETTINGS.CURRENT_POINT = index;
                    PRIVATE_METHODS.ANIMATE_ITEM(SETTINGS.CURRENT_POINT);

                }

            },
            ANIMATE_ITEM: (_COUNT) => {

                const WIDTH = TARGET.offsetWidth;

                SETTINGS.LOCK_ANIMATE = true;
                PRIVATE_METHODS.ACTIVE_DURATION();

                if (_COUNT < 1 || _COUNT > SETTINGS.MAX_COUNT) {

                    PRIVATE_METHODS.REGENERATE_SLIDER(_COUNT);

                }
                else {

                    setTimeout(() => {

                        SETTINGS.LOCK_ANIMATE = false;

                    }, SETTINGS.ANIMATE_DURATION);

                }

                CONTAINER.style.transform = `translateX(${SETTINGS.CURRENT_POINT * -WIDTH}px)`;

            },
            GENERATE_BTNS: (_TARGET) => {

                const PREV = document.createElement('span'),
                    NEXT = document.createElement('span');

                PREV.className = 'slider-btn previous-btn';
                PREV.addEventListener('click', PRIVATE_METHODS.PREVIOUS);

                NEXT.className = 'slider-btn next-btn';
                NEXT.addEventListener('click', PRIVATE_METHODS.NEXT);

                // append btns
                _TARGET.appendChild(PREV);
                _TARGET.appendChild(NEXT);

            },
            GENERATE_DOTS: (_TARGET) => {

                const DOT_CONTAINER = document.createElement('div');

                let i = 0,
                    j = SETTINGS.MAX_COUNT;

                DOT_CONTAINER.className = 'dot-container';

                for (i; i < j; i++) {

                    const DOT = document.createElement('span');
                    DOT.className = 'dot';
                    DOT.dataset.index = i + 1;

                    DOT.addEventListener('click', (e) => {

                        PRIVATE_METHODS.SET_ITEM(e.currentTarget.dataset.index);

                    });

                    DOT_CONTAINER.appendChild(DOT);

                }

                _TARGET.appendChild(DOT_CONTAINER);

            },
            REGENERATE_SLIDER: (_COUNT) => {

                const WIDTH = TARGET.offsetWidth;
                let ADJEST_COUNT = 0;

                if (_COUNT < 1) {

                    ADJEST_COUNT = S_ITEMS.length;

                }
                else if (_COUNT > SETTINGS.MAX_COUNT) {

                    ADJEST_COUNT = 1;

                }

                // 關閉動畫 + 調到應有的位置
                setTimeout(() => {

                    CONTAINER.style.transitionDuration = 'unset';
                    CONTAINER.style.transform = `translateX(${ADJEST_COUNT * -WIDTH}px)`;
                    SETTINGS.CURRENT_POINT = ADJEST_COUNT;
                    SETTINGS.LOCK_ANIMATE = false;

                }, SETTINGS.REGENERATE_TIME);

                // 重新加回動畫
                setTimeout(PRIVATE_METHODS.ACTIVE_DURATION, SETTINGS.REGENERATE_TIME + 100);

            },
            ADJUST_RWD_SLIDER_CONTAINER: () => {

            },
            START: () => {

                TIMER = setInterval(PRIVATE_METHODS.NEXT, SETTINGS.TIME_INTERVAL);
                // TIMER = setTimeout(PRIVATE_METHODS.NEXT, SETTINGS.TIME_INTERVAL);
                return TIMER;

            },
            STOP: () => {

                clearInterval(TIMER);

            },
            SETUP_SLIDER: () => {

                const WIDTH = TARGET.offsetWidth;
                CONTAINER.style.transform = `translateX(${SETTINGS.CURRENT_POINT * -WIDTH}px)`;

                Object.keys(opts).forEach((key) => {

                    const KEY = key.toUpperCase();

                    if (SETTINGS[KEY]) {

                        SETTINGS[KEY] = opts[key];

                    }

                });

                SETTINGS.MAX_COUNT = S_ITEMS.length;

                if (SETTINGS.WITH_BTNS) {

                    PRIVATE_METHODS.GENERATE_BTNS(TARGET);

                }

                if (SETTINGS.WITH_DOTS) {

                    PRIVATE_METHODS.GENERATE_DOTS(TARGET);

                }

                const END_ITEM =  S_ITEMS[S_ITEMS.length - 1].cloneNode(true),
                START_ITEM = S_ITEMS[0].cloneNode(true);

                END_ITEM.classList.add('end-clone');
                START_ITEM.classList.add('start-clone');

                // 預備左右的邊界
                // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend
                CONTAINER.prepend(END_ITEM);
                CONTAINER.appendChild(START_ITEM);

            },
        },
        PUBLIC = {
            version: SETTINGS.VERSION,
        };

    let TIMER,
        RWD_TIMER,
        TARGET,
        S_ITEMS,
        CONTAINER;

    if (!opts || !opts.elem) {

        return console.error(`we have some problems :'(`);

    }

    // assign DOM elements
    TARGET = opts.elem;
    CONTAINER = TARGET.querySelector('.slider-container');
    S_ITEMS = CONTAINER.querySelectorAll('.s-item');

    TARGET.addEventListener('mouseover', PRIVATE_METHODS.MOUSE_OVER);
    TARGET.addEventListener('mouseout', PRIVATE_METHODS.MOUSE_OUT);

    PRIVATE_METHODS.SETUP_SLIDER(TARGET);
    PRIVATE_METHODS.START();

    return PUBLIC;

};

export { slider };
