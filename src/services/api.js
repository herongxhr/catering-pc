//https://github.com/ljharb/qs
//qs.stringify(object, [options]);
import { stringify } from 'qs';
import request from '../utils/request';

export function queryCatalogF() {
    return request({
        method: 'get',
        url: '/goods/catalog',
        data: {
            showLoading: true,
            params: {
                subcatalog: 'F'
            }
        }

    });
}
export function queryTodoList() {
    return request({
        method: 'post',
        url: '/catering/workbench/todoList',
        data: {
            showLoading: true,
        }

    });
}
// export function queryTodoList() {
//     return request({
//         method: 'post',
//         url: '/catering/workbench/todoList',
//         data: {
//             showLoading: true,
//         }

//     });
// } 
// export async function queryBrandList(catalog) {
//     return axios('/goods/brand/page/');
// }

// export async function queryGoodSku({ catalog, brand }) {
//     return axios(`/goods/${catalog}/${brand}`);
// }