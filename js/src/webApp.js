import VueRoot from '/js/src/short_keys.js';


let vueRoot = VueRoot();
new Vue({
    render: h => h(vueRoot),
}).$mount(`#app`);
