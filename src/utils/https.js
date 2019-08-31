import axios from 'axios'
import store from '../store'
import router from '../router'

//请求拦截

axios.interceptors.request.use((config) => {
    // Do something before request is sent


    store.dispatch("setLoadingAsync", true)

    if (localStorage.getItem("jwtToken")) {
        config.headers.Authorization = localStorage.jwtToken;
    }

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use((response) => {
    // Do something with response data

    store.dispatch("setLoadingAsync", false)

    return response;
}, (error) => {
    // Do something with response error
    store.dispatch("setLoadingAsync", false)

    const { status } = error.response;

    if (status == 401) {
        //提示
        alert("token值失效，请重新登陆");
        //清除缓存
        localStorage.removeItem("jwtToken");

        //vuex状态初始化
        store.dispatch("setIsLoginAsync", false);
        store.dispatch("setProfileAsync", null);
        store.dispatch("setUserAsync", null);


        router.push("/login");
    }
    return Promise.reject(error);
});

export default axios;
