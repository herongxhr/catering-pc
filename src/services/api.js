//https://github.com/ljharb/qs
//qs.stringify(object, [options]);
//import { stringify } from 'qs';
import request from '../utils/request';

// 辅料商城
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

/**
 * 使用post方法
 * @param {object | Array} data axios()的post方法的数据体
 */
export function createGoodsF(data) {
    return request({
        method: 'get',
        url: '/catering/accsupermarket/queryGoodF',
        data: {
            showLoading: true,
            axiosData: data,
        }
    });
}
export function queryTodoList() {
    return request({
        method: 'get',
        url: '/catering/workbench/todoList',
        data: {
            showLoading: true,
        }
    });
}
//获取验收情况
export function queryList(params) {
    return request({
        method: 'get',
        url: '/catering/workbench/distributionReview',
        data: {
            showLoading: true,
            params: {
                ...params,
            },
        }
    });
}
export function queryStatistics(params) {
    return request({
        method: 'get',
        url: '/catering/workbench/unpaidStatistics',
        data: {
            showLoading: true,
            params,
        }
    });
}
export function querydeviceInfo() {
    return request({
        method: 'get',
        url: '/catering/workbench/deviceInfo',
        data: {
            showLoading: true,
        }
    });
}

export function querytodayMenu() {
    return request({
        method: 'get',
        url: '/catering/workbench/todayMenu',
        data: {
            showLoading: true,
        }
    });
}
export function queryReportmissing(params) {
    return request({
        method: 'get',
        url: '/catering/workbench/reportmissing',
        data: {
            showLoading: true,
            params,
        }
    })
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

//菜单中心专区
export function queryUnifiedMenu(params) {//获取统一菜单数据
    return request({
        method: 'get',
        url: '/catering/unifiedMenu/pageList',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}
export function queryUnifiedMenuDetails(params) {//获取统一菜单详情
    return request({
        method: 'get',
        url: '/catering/unifiedMenu/item/detail',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}
export function queryMyMenu(params) {//获取我的菜单数据
    return request({
        method: 'get',
        url: '/catering/myMenu/pageList',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}
export function queryMyMenuDetails(params) {//获取我的菜单详情
    return request({
        method: 'get',
        url: '/catering/myMenu/item/detail',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}
export function queryMyMenuTemplate(params) {//获取我的模板数据
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/my',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}
export function queryNewMenuTemplate(params) {//获取推荐模板数据
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/new',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}
export function toCopyTemplate(id) {//获取推荐模板数据
    return request({
        method: 'get',
        url: 'catering/camenuTemplate/my/item/copy',
        data: {
            showLoading: true,
            params: { id }
        }
    })
}
export function toDeleteTemplate(id) {//获取推荐模板数据
    return request({
        method: 'get',
        url: 'catering/camenuTemplate/my/item/delete',
        data: {
            showLoading: true,
            params: { id }
        }
    })
}


export function myMenu() {
    return request({
        method: 'get',
        url: '/catering/myMenus',
        data: {
            showLoading: true
        }
    })
}

export function myTemplate() {
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/my',
        data: {
            showLoading: true
        }
    })
}

export function isRecommend() {
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/hasRecommend',
        data: {
            showLoading: true
        }
    })
}

export function recommendTemplate() {
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/my_1551273630829',
        data: {
            showLoading: true
        }
    })
}

export function myCopy(params) {
    console.log(params)
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/my/item/copy',
        data: {
            params,
        }
    })
}

export function queryDishes(params) {
    return request({
        method: 'get',
        url: '/catering/camenu/selectDishes',
        data: {
            showLoading: true,
            params: {
                type: params
            }
        }
    })
}
export function queryTemplateDetail(params) {
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/my/item/detail',
        data: {
            showLoading: true,
            params: {
                type: params
            }
        }
    })
}


// export async function queryBrandList(catalog) {
//     return axios('/goods/brand/page/');
// }

// export async function queryGoodSku({ catalog, brand }) {
//     return axios(`/goods/${catalog}/${brand}`);
// }

// 采购订单专区
export function queryOrderData(params) {
    return request({
        method: 'get',
        url: '/catering/purOrder',
        data: {
            showLoading: true,
            params: {
                ...params
            }
        }
    })
}
export function queryOrderDetails() {
    return request({
        method: 'get',
        url: '/catering/orderDetails',
        data: {
            showLoading: true,
        }
    })
}

export function queryGoodsByOrderId(id) {
    return request({
        method: 'get',
        url: '/catering/queryGoodsByOrderId',
        data: {
            showLoading: true,
            params: {
                id,
            }
        }
    })
}

export function queryPurCatalog(params) {
    //console.log(params);
    return request({
        method: 'get',
        url: '/catering/workbench/purchaseList/pageList',
        data: {
            showLoading: true,
            params,
        }
    })
}
export function queryIngreType(params) {
    return request({
        method: 'get',
        url: '/catering/workbench/purchaseList/catalog',
        data: {
            showLoading: true,
            params,
        }
    })
}
export function queryPriceHistory(params) {
    return request({
        method: 'get',
        url: '/catering/workbench/purchaseList/item/priceHistory',
        data: {
            showLoading: true,
            params,
        }
    })
}
export function queryDelivery() {
    return request({
        method: 'get',
        url: '/catering/workbench/delivery',
        data: {
            showLoading: true,
        }
    })
}
