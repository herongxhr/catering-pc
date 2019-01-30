import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static ajax(options){
        let loading;
        loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';
        
        let baseApi = 'https://www.easy-mock.com/mock/5c4c02ec50f5ab309c7dec17/DataSource';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
            }).then((response)=>{

                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'none';
                if (response.status == '200'){
                    let res = response.data
                    console.log(res)
                    if (res.code == 0){
                        resolve(res.result);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}