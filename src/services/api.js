//https://github.com/ljharb/qs
//qs.stringify(object, [options]);
import { stringify } from 'qs';
import request from '../utils/request';

export function queryCatalog() {
    return request({
        method: 'get',
        url: '/catering/accsupermarket/catalog',
        data: {
            showLoading: true,
            params: {
                isF: 'y'
            }
        }
    });
}

export function queryHotGoods() {
    return request({
        method: 'get',
        url: '/goods/hots',
        data: {
            showLoading: true,
        }
    });
}

export function queryRule(params) {
    return request({
        method: 'get',
        url: '/goods/catalogF/good',
        data: {
            showLoading: true,
            params,
        }
    })
}
// export async function queryBrandList(catalog) {
//     return axios('/goods/brand/page/');
// }

// export async function queryGoodSku({ catalog, brand }) {
//     return axios(`/goods/${catalog}/${brand}`);
// }