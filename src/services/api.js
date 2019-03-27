import request from '../utils/request';
import requestpub from '../utils/common';
// 辅料商城
// 查询分类
export function queryCatalogF(params) {
    return request({
        method: 'get',
        url: '/pub/catalog/listQuery',
        data: {
            showLoading: true,
            params,
        }
    });
}
// 查询品牌
export function queryBrands(params) {
    return request({
        method: 'get',
        url: '/pub/brand/pageQuery',
        data: {
            showLoading: true,
            params,
        }
    });
}
// 查询品牌
export function queryFGoods(params) {
    return request({
        method: 'get',
        url: '/pub/sku/pageQuery',
        data: {
            showLoading: true,
            params,
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
        url: '/catering/workbench/shortage/pageList',
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
//菜单中心专区
export function queryMenuData(params) {//获取菜单列表
    return request({
        method: 'get',
        url: '/catering/camenu/pageQuery',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}
export function queryMenuDetails(id) {//获取菜单详情
    return request({
        method: 'get',
        url: `/catering/camenu/${id}`,
        data: {
            showLoading: true,
        }
    })
}
export function queryPMenuTemplate(params) {//餐饮单位模板
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/pageQuery',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}
export function queryCMenuTemplate(params) {//餐饮管理单位模板
    return request({
        method: 'get',
        url: '/catering/menuTemplate/pageQuery',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}
// 餐饮单位 模板详情
export function queryPTemplateDetails(templateId) {
    return request({
        method: 'get',
        url: `/catering/camenuTemplate/${templateId}`,
        data: {
            showLoading: true,
        }
    })
}
// 管理单位模板详情
export function queryCTemplateDetails(templateId) {//查看模板
    return request({
        method: 'get',
        url: `/catering/menuTemplate/${templateId}`,
        data: {
            showLoading: true,
        }
    })
}

export function toUpdateMenu(params) {//修改菜单数据
    const id = params.id || '';
    return request({
        method: 'post',
        url: `/catering/camenu/${id}`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            axiosData: JSON.stringify(params)
        }
    })
}
export function toNewMenu(params) {//修改菜单数据
    const id = params.id || '';
    return request({
        method: 'post',
        url: `/catering/camenu/${id}`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            axiosData: JSON.stringify(params)
        }
    })
}
export function addMenuData(params) {//新建菜单数据
    return request({
        method: 'post',
        url: `/catering/camenu/`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            axiosData: JSON.stringify(params)
        }
    })
}
export function queryDishes(params) {//获取菜品数据
    return request({
        method: 'get',
        url: '/pub/food/pageQuery',
        data: {
            showLoading: true,
            params: { ...params }
        }
    })
}

export function toCopyTemplate(templateId) {//复制模板
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/my/item/copy',
        data: {
            showLoading: true,
            params: { templateId }
        }
    })
}
export function toDeleteTemplate(templateId) {//删除模板
    return request({
        method: 'get',
        url: 'catering/camenuTemplate/my/item/delete',
        data: {
            showLoading: true,
            params: { templateId }
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
    //console.log(params)
    return request({
        method: 'get',
        url: '/catering/camenuTemplate/my/item/copy',
        data: {
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

// 采购订单专区
export function queryOrderTable(params) {
    return request({
        method: 'get',
        url: '/catering/order/orders',
        data: {
            showLoading: true,
            params: {
                ...params
            }
        }
    })
}
export function queryOrderDetails(params) {
    return request({
        method: 'get',
        url: `/catering/order/${params.id}`,
        data: {
            showLoading: true,
            ...params
        }
    })
}

export function queryOrderItemGoods(params) {
    return request({
        method: 'get',
        url: '/catering/order/item/goods',
        data: {
            ...params
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

export function queryDelivery(params) {
    return request({
        method: 'get',
        url: '/catering/distribution/pageQuery',
        data: {
            showLoading: true,
            params,
        }
    })
}

export function queryEager(params) {
    return request({
        method: 'get',
        url: '/catering/workbench/shortage/item/eager',
        data: {
            showLoading: true,
            params,
        }
    })
}
export function queryWithdrawal(params) {
    return request({
        method: 'get',
        url: '/catering/workbench/shortage/item/withdrawal',
        data: {
            showLoading: true,
            params,
        }
    })
}
//缺样上报详情页
export function queryDetail(params) {
    return request({
        method: 'get',
        url: '/catering/workbench/shortage/item/detail',
        data: {
            showLoading: true,
            params,
        }
    })
}
//上报商品 put方法 除了get请求其他都要添加headers    http://192.168.122.10

export function querySave(params) {
    const data = JSON.stringify(params)
    return request({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: '/catering/workbench/shortage/item/save',
        data: {
            axiosData: data
        }
    })
}
//采购目录详情---食材详情
export function queryIngreDetail(params) {
    return requestpub({
        method: 'get',
        url: `/pub/sku/${params.id}`,
        data: {
            showLoading: true,
        }
    })
}
//台账专区
export function queryParameterTable(params) {
    return request({
        method: 'get',
        url: '/catering/ledger/distribution/month',
        data: {
            showLoading: true,
            params
        }
    })
}

export function queryParameterDetail(params) {
    return request({
        method: 'get',
        url: '/catering/ledger/distribution/day',
        data: {
            showLoading: true,
            params,
        }
    })
}