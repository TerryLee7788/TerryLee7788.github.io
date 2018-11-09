const cookie = {
    get: (cname) => {

        const name = cname + '=',
            ca = document.cookie.split(';'),
            l = ca.length;

        let i = 0;

        for (i; i < l; i++) {

            let c = ca[i];

            while (c.charAt(0) === ' ') {

                c = c.substring(1);

            }

            if (c.indexOf(name) === 0) {

                return c.substring(name.length, c.length);

            }

        }

        return '';

    },
    set: (cname, cvalue, exdays = 1, domain, path = '/') => {

        let d = new Date(),
            domainStr = '',
            pathStr = `path=${path}`;

        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

        const expires = `expires=${d.toUTCString()}; `;

        if (domain) {

            domainStr = `domain=${domain}; `;

        }

        document.cookie = `${cname}=${cvalue};${expires}${domainStr}${pathStr}`;

    },
};

export { cookie };