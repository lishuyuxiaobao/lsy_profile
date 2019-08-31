import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import isLogin from './modules/isLogin'
import profile from './modules/profile'
import profiles from './modules/profiles'
import loading from './modules/loading'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        isLogin,
        profile,
        loading,
        profiles
    }
})
