// vuex persistence state, so store data remains even after refresh

import createPersistedState from 'vuex-persistedstate';

export default ({store, app}) => {
    createPersistedState({
        storage: {
            getItem: (vuexKey) => {
                const vuex = {};
                const cookies = app.$cookies.getAll();
                for (const subKey of Object.keys(cookies)) {
                    if (subKey.split('_')[0] === vuexKey) {
                        const modKey = subKey.replace(vuexKey + '_', '');
                        vuex[modKey] = cookies[subKey];
                    }
                }
                return vuex;
            },
            setItem: (vuexKey, value) => {
                const json = JSON.parse(value);
                for (const k of Object.keys(json)) {
                    const subKey = vuexKey + '_' + k;
                    app.$cookies.set(subKey, json[k], {path: '/', maxAge: 60 * 60 * 24 * 7, secure: false});
                }
                return true;
            },
            removeItem: (vuexKey) => {
                const cookies = app.$cookies.getAll();
                for (const subKey of Object.keys(cookies)) {
                    if (subKey.split('_')[0] === vuexKey) {
                        app.$cookies.remove(subKey);
                    }
                }
                return true;
            }
        }
    })(store)
}