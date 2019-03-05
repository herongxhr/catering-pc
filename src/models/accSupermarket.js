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
        goodsList: [
            // {
            //     id,
            //     brand,
            //     isCollected,
            //     img,
            //     price,
            //     unit
            //     goodsName,
            //     provider,
            // }
        ],
        pageSize: 12,
        currPage: 1,
        showCartDrawer: false,
        shoppingCart: []
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
        // 显示购物车页面
        showCartDrawer(state) {
            return {
                ...state,
                showCartDrawer: true,
            }
        },
        // 隐藏购物车详情
        hideCartDrawer(state) {
            return {
                ...state,
                showCartDrawer: false,
            }
        },
        // 加商品到购物车
        addToCart(state, { payload }) {
            const { id, quantity } = payload;
            // 看一下购物车里，有没有要加的商品
            let isExist = state.shoppingCart.find(item => item.id === id);
            // 如果有的话,改一下数量
            if (isExist) {
                return {
                    ...state,
                    shoppingCart: state.shoppingCart.map(item => {
                        if (item.id === id) {
                            return {
                                id,
                                quantity: item.quantity + quantity,
                            }
                        }
                        return item;
                    }),
                }
            } else {
                return {
                    ...state,
                    shoppingCart: state.shoppingCart.concat({
                        id,
                        quantity,
                    }),
                }
            }
            // 如果购物车为空，直接把商品加进去
        },
        // 修改购物车内商品数量
        changeCartNum(state, { payload }) {
            let { id, value } = payload;
            return {
                ...state,
                shoppingCart: state.shoppingCart.map(item => {
                    if (item.id === id) {
                        return {
                            id,
                            quantity: value,
                        }
                    }
                    return item;
                })
            }
        },
        // 删除购物车中商品
        deleteCartGoods(state, { payload }) {
            let { id } = payload;
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(item => item.id !== id),
            }
        }
    },
};