//https://github.com/ljharb/qs
//qs.stringify(object, [options]);
import { stringify } from 'qs';
import request from '../utils/request';

export function queryGoodsF({ params }) {
    return request({
        method: 'get',
        url: '/catering/accsupermarket/queryGoodF',
        data: {
            showLoading: true,
            params: {
                ...params,
                isF: "y",
            },
        }
    });
}

// export async function queryBrandList(catalog) {
//     return axios('/goods/brand/page/');
// }

// export async function queryGoodSku({ catalog, brand }) {
//     return axios(`/goods/${catalog}/${brand}`);
// }