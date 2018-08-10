var swipe = function (elem) {

    let start,
        end;

    const START_EVENT_TYPES = [
            'touchstart',
            'mousedown',
        ],
        END_EVENT_TYPES = [
            'touchend',
            'mouseup',
        ],
        TRIGGER_RANG = 0.2;

    function handleGesture () {

        const { width, height } = elem.getBoundingClientRect(),
            ratioHorizontal = end.type === 'touchend' ? (end.changedTouches[0].screenX - start.changedTouches[0].screenX) / width : (end.screenX - start.screenX) / width,
            ratioVertical = end.type === 'touchend' ? (end.changedTouches[0].screenY - start.changedTouches[0].screenY) / width : (end.screenY - start.screenY) / height;

        if (ratioHorizontal > ratioVertical && ratioHorizontal > TRIGGER_RANG) {

            return alert('swipe-right');

        }
        if (ratioVertical > ratioHorizontal && ratioVertical > TRIGGER_RANG) {

            return alert('swipe-down');

        }
        if (ratioHorizontal < ratioVertical && ratioHorizontal < -TRIGGER_RANG) {

            return alert('swipe-left');

        }
        if (ratioVertical < ratioHorizontal && ratioVertical < -TRIGGER_RANG) {

            return alert('swipe-up');

        }

        alert('nothing.');

    }

    START_EVENT_TYPES.forEach(function (ev) {

        elem.addEventListener(ev, function (event) {

            start = event;

        }, false);

    });

    END_EVENT_TYPES.forEach(function (ev) {

        elem.addEventListener(ev, function (event) {

            end = event;
            handleGesture();

        }, false);

    });

};

