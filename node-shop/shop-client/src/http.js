import axios from "axios";
import { Message, Loading } from "element-ui";
import router from './router';

let loading;

var startLoading = function () {
    loading = Loading.service({
        lock: true,
        text: "正在加载中",
        background: 'rgba(0, 0, 0, 0.5)'
    });
}


var endLoading = function () {
    loading.close();
}


// 请求拦截
axios.interceptors.request.use(config => {
    // 加载动画
    startLoading();

    if (localStorage.eleToken) {
        // 设置统一的请求header
        config.headers.Authorization = localStorage.eleToken;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


// 响应拦截
axios.interceptors.response.use(response => {
    //  结束动画
    endLoading();
    return response;
}, (error) => {
    endLoading();
    Message.error(error.response.data);

    // 获取状态码
    const { status } = error.response;
    if (status == 401) {
        Message.error("token已经失效，请重新登录！");
        // 清除token
        localStorage.removeItem("eleToken");
        // 跳转到登录页面
        router.push("/login");
    }
    return Promise.reject(error);
})


export default axios;
