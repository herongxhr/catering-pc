import { queryGoodsF } from '../services/api';

export default {
    namespace: 'accSupermarket',
    state: {
        catalogList: [
            {
                id: 0,
                catalog_name: "全部",
            }
        ],
        currCatalog: 0,
        brandList: [
            {
                id: 0,
                brand_name: "全部",
            }
        ],
        currBrand: 0,
        collectStatus: [
            {
                id: 0,
                status_name: "全部"
            },
            {
                id: 1,
                status_name: "采购目录中商品"
            },
            {
                id: 2,
                status_name: "采购目录外商品"
            }
        ],
        currCollectStatus: 0,
        goodList: [
            // {
            //     id,
            //     brand,
            //     isCollected,
            //     img,
            //     price,
            //     goods_name,
            //     provider,
            // }
        ],
        pageSize: 12,
        currPage: 1,
    },
    effects: {
        // payload = {
        //     currCatalog,
        //     currBrand,
        //     currCollectStatus
        // }
        *fetchGoodsF({ payload }, { call, put }) {
            //call方法首参数为要调用的异步方法
            const data = yield call(queryGoodsF, payload);
            //put方法类似于dispatch方法
            yield put({
                //本模块内方法的type不需要加namespace前缀
                type: 'saveGoods',
                payload: {
                    data,
                    ...payload,
                },
            });
        },
    },

    reducers: {
        saveGoods(state, { payload }) {
            const {
                data: {
                    catalog_list,
                    brand_list,
                    goods_list
                },
                currCatalog,
                currBrand,
                currCollectStatus,
            } = payload;

            return {
                ...state,
                catalogList: state.catalogList.slice(0, 1).concat(...catalog_list),
                brandList: state.brandList.slice(0, 1).concat(...brand_list),
                goodsList: goods_list,
                currCatalog,
                currBrand,
                currCollectStatus
            };
        },
    },
};