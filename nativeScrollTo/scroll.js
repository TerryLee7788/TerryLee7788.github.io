(function (opts) {

    var scrollTo = function (el) {

        var scrollX = window.scrollX ? 'scrollX' : 'pageXOffset',
            scrollY = window.scrollY ? 'scrollY' : 'pageYOffset',
            SPEED = 15,

            _x = el ? el.offsetLeft : 0,
            _y = el ? el.offsetTop : 0;

        function goScroll () {

            var currentX = window[scrollX],
                currentY = window[scrollY],
                checkX = currentX > _x,
                checkY = currentY > _y;

            if (checkX || checkY) {

                setTimeout(function () {

                    if (checkX) {

                        currentX -= SPEED;

                    }

                    if (checkY) {

                        currentY -= SPEED;

                    }
                    window.scrollTo(currentX, currentY);
                    goScroll();

                }, 0);

            }

        }

        goScroll();

    };

    document.querySelector(opts.target).addEventListener('click', function () {

        // scroll to specific DOM element, if you give a parameter.
        scrollTo(document.querySelector('.yellow'));

        // call this function directly, can scroll to top.
        // scrollTo();

    }, false);

})({
    target: '.js-top',
});
