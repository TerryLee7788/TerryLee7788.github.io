require('../../scss/pages/_index.scss');

const jsCollapse = document.querySelector('.js-collapse');

jsCollapse.addEventListener('click', () => {

    document.querySelector('.nav-bar ul').classList.toggle('active');

});
