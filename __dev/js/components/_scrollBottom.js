/**
 * API DOC:
 * @author: terry
 * @parameter opts {Object}
 *     @property target {Element} - The 'real content', A really height (like: 2000px ... eg) DOM element (default: document.body)
 *     @property container {Element} - The 'target' container (default: window)
 *     @property callback {Function} - When scrolling near the bottom of the 'container' (requried)
 */
const scrollBottom = (opts) => {

    const PUBLIC = {
        NEAR_BOTTOM: opts.near_bottom || 200,
    },
        PRIVATE_METHODS = {
            GET_WINDOW_SCROLL_PROPERTY: () => {
                
                return {
                    scrollX: window.scrollX ? window.scrollX : window.pageXOffset,
                    scrollY: window.scrollY ? window.scrollY : window.pageYOffset,
                };

            },
            IS_NEAR_BOTTOM: () => {

                const WINDOW_SCROLL_PROPERTY = PRIVATE_METHODS.GET_WINDOW_SCROLL_PROPERTY(),
                    CONTAINER_TOP = CONTAINER.scrollTop || WINDOW_SCROLL_PROPERTY.scrollY,
                    VIEW_PORT_HEIGHT = window.innerHeight,
                    TARGET_HEIGHT = TARGET.offsetHeight || VIEW_PORT_HEIGHT;

                let IS_NEAR_BOTTOM = false;

                if ((CONTAINER_TOP + VIEW_PORT_HEIGHT) >= (TARGET_HEIGHT - PUBLIC.NEAR_BOTTOM)) {

                    IS_NEAR_BOTTOM = true;

                }

                return IS_NEAR_BOTTOM;

            },
            WHEN_SCROLLING_NEAR_BOTTOM: () => {

                const IS_NEAR_BOTTOM = PRIVATE_METHODS.IS_NEAR_BOTTOM();

                if (opts.callback &&
                    // 確保它是 function ~
                    opts.callback instanceof Function &&
                    IS_NEAR_BOTTOM) {

                    opts.callback();

                }

            },
        };

    // assign DOM elements
    const TARGET = opts.target || document.body,
        CONTAINER = opts.container || window;

    CONTAINER.addEventListener('scroll', PRIVATE_METHODS.WHEN_SCROLLING_NEAR_BOTTOM);

    return PUBLIC;

};

export { scrollBottom };
