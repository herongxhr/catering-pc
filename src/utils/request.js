import React from 'react';
import axios from 'axios';
import { Spin, message } from 'antd';

export default async function request(options) {
    // let loading;
    // let isShowLoading = options.data && options.data.showLoading;
    // if (isShowLoading) {
    //     loading = document.getElementById('ajaxLoading');
    //     loading.innerHTML = (<Spin />);
    // }
    let baseApi = ' https://easy-mock.com/mock/5c6cf43f2ecce005c352d626';
    try {
        const response = await axios({
            method: options.method,
            url: options.url,
            baseURL: baseApi,
            params: (options.data && options.data.params) || '',
        });
        // if (isShowLoading) {
        //     loading = document.getElementById('ajaxLoading');
        //     loadiing.style.display = 'none';
        // }
        //此时的response为axios包装返回的response而不是后台返回的json对象
        if (response.status >= 200 && response.status < 300) {
            //res为后台返回的json对象
            let res = response.data;
            if (res.code === 200) {
                console.log(res);
            } else {
                message.info(res.msg);
            }
        } else {
            console.log(response.data);
        }
    } catch (error) {
        console.log(error)
    }
}
