import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {

    static ajax(options){
        let loading;
        loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';

        let baseApi = 'http://yapi.uanla.test:7777/mock/17/catering';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
            }).then((response)=>{
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'none';
                if (response.status === 200){
                    let res = response.data
                    if (res.code === 0){
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
    
    static request(options){
        let loading;
        loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';

        let baseApi = 'http://yapi.uanla.test:7777/mock/17/catering';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
            }).then((response)=>{
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'none';
                if (response.status === 200){
                    let res = response.data
                    if (res.code === 0){
                        resolve(res.data);
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
		
    static ajaxGroup(requests) {
			let baseApi = 'http://yapi.uanla.test:7777/mock/17/catering';
      let promises = []
			for(let i = 0; i <  requests.length; i++) {
				promises.push(axios.get(`${baseApi}${requests[i].url}`))
			}
			return new Promise((resolve,reject)=>{
				axios.all(promises).then(axios.spread((...args) => {
					resolve(args)
				}))				
			})
    }
}