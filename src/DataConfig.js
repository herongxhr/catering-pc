/*
 * @Author: suwei 
 * @Date: 2019-03-21 11:07:07 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-22 15:08:39
 */

const pendingDeliveryDetail = [
  {
    key: '1',
    tags: '订单商品',
    goods: '名称+规格参数',
    unit: '斤',
    univalent: '26',
    count: '30',
    totalPrice:'780',
    status:'O',
  },
  {
    key: '2',
    tags: '置换商品',
    goods: '名称+规格参数',
    unit: '斤',
    univalent: '26',
    count: '30',
    totalPrice:'780',
    status:'Z',
  },
  {
    key: '3',
    tags: '订单商品',
    goods: '名称+规格参数',
    unit: '斤',
    univalent: '26',
    count: '30',
    totalPrice:'780',
    status:'O',
  },
  {
    key: '4',
    tags: '置换商品',
    goods: '名称+规格参数',
    unit: '斤',
    univalent: '26',
    count: '30',
    totalPrice:'780',
    status:'Z',
  },
  {
    key: '5',
    tags: '订单商品',
    goods: '名称+规格参数',
    unit: '斤',
    univalent: '26',
    count: '30',
    totalPrice:'780',
    status:'O',
  },
  {
    key: '6',
    tags: '置换商品',
    goods: '名称+规格参数',
    unit: '斤',
    univalent: '26',
    count: '30',
    totalPrice:'780',
    status:'Z',
  },
  {
    key: '7',
    tags: '订单商品',
    goods: '名称+规格参数',
    unit: '斤',
    univalent: '26',
    count: '30',
    totalPrice:'780',
    status:'O',
  },
  {
    key: '8',
    tags: '置换商品',
    goods: '名称+规格参数',
    unit: '斤',
    univalent: '26',
    count: '30',
    totalPrice:'780',
    status:'Z',
  }
 ]

const delivery = {
  "code": 0,
  "msg": "后端出错",
  "result": [
    {
      "key": 1,
      "Delivery": "1981-06-29",
      "Supplier": "Daniel",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "723824292",
      "Operation": "换货申请"
    },
    {
      "key": 2,
      "Delivery": "1981-05-07",
      "Supplier": "Scott",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "60174645",
      "Operation": "换货申请"
    },
    {
      "key": 3,
      "Delivery": "1994-02-18",
      "Supplier": "David",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "808136134",
      "Operation": "换货申请"
    },
    {
      "key": 4,
      "Delivery": "2008-11-02",
      "Supplier": "Mark",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "9828062",
      "Operation": "换货申请"
    },
    {
      "key": 5,
      "Delivery": "1988-09-25",
      "Supplier": "Larry",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "07695339",
      "Operation": "换货申请"
    },
    {
      "key": 6,
      "Delivery": "1984-06-03",
      "Supplier": "James",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "8776637",
      "Operation": "换货申请"
    },
    {
      "key": 7,
      "Delivery": "2018-05-15",
      "Supplier": "Linda",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "4154247",
      "Operation": "换货申请"
    },
    {
      "key": 8,
      "Delivery": "1989-05-02",
      "Supplier": "Kenneth",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "69727527",
      "Operation": "换货申请"
    },
    {
      "key": 9,
      "Delivery": "2000-07-11",
      "Supplier": "Susan",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "462673640",
      "Operation": "换货申请"
    },
    {
      "key": 10,
      "Delivery": "1986-03-09",
      "Supplier": "Timothy",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "1791264831",
      "Operation": "换货申请"
    },
    {
      "key": 11,
      "Delivery": "1999-02-21",
      "Supplier": "Jessica",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "676784528",
      "Operation": "换货申请"
    },
    {
      "key": 12,
      "Delivery": "2011-12-14",
      "Supplier": "Barbara",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "9788763120",
      "Operation": "换货申请"
    },
    {
      "key": 13,
      "Delivery": "2012-04-08",
      "Supplier": "Scott",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "381820155",
      "Operation": "换货申请"
    },
    {
      "key": 14,
      "Delivery": "2009-04-08",
      "Supplier": "Edward",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "483964",
      "Operation": "换货申请"
    },
    {
      "key": 15,
      "Delivery": "1974-02-08",
      "Supplier": "Lisa",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "5356894",
      "Operation": "换货申请"
    },
    {
      "key": 16,
      "Delivery": "1971-06-06",
      "Supplier": "Frank",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "460736635",
      "Operation": "换货申请"
    },
    {
      "key": 17,
      "Delivery": "1989-10-08",
      "Supplier": "Jeffrey",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "327682437",
      "Operation": "换货申请"
    },
    {
      "key": 18,
      "Delivery": "1973-11-23",
      "Supplier": "Michael",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "80129",
      "Operation": "换货申请"
    },
    {
      "key": 19,
      "Delivery": "1984-04-16",
      "Supplier": "George",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "128680",
      "Operation": "换货申请"
    },
    {
      "key": 20,
      "Delivery": "1983-06-11",
      "Supplier": "Thomas",
      "abstract": [
        "胡萝卜",
        "山药",
        "带鱼",
        "土豆"
      ],
      "order": "8604518247",
      "Operation": "换货申请"
    }
  ]
}

const parameter = [
  {
    "key": 1,
    "Supplier": "2",
    "Month": "1970-04-10",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 2,
    "Supplier": "1",
    "Month": "1977-07-21",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 3,
    "Supplier": "1",
    "Month": "1994-05-03",
    "Number": "0",
    "Acount": "8.8万"
  },
  {
    "key": 4,
    "Supplier": "1",
    "Month": "2001-07-03",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 5,
    "Supplier": "2",
    "Month": "2005-02-10",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 6,
    "Supplier": "1",
    "Month": "1990-07-16",
    "Number": "0",
    "Acount": "8.8万"
  },
  {
    "key": 7,
    "Supplier": "2",
    "Month": "1983-12-04",
    "Number": "0",
    "Acount": "8.8万"
  },
  {
    "key": 8,
    "Supplier": "1",
    "Month": "2000-07-15",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 9,
    "Supplier": "1",
    "Month": "1985-11-08",
    "Number": "0",
    "Acount": "8.8万"
  },
  {
    "key": 10,
    "Supplier": "0",
    "Month": "1982-03-20",
    "Number": "0",
    "Acount": "8.8万"
  },
  {
    "key": 11,
    "Supplier": "0",
    "Month": "1998-06-02",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 12,
    "Supplier": "1",
    "Month": "1994-09-12",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 13,
    "Supplier": "1",
    "Month": "2013-04-29",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 14,
    "Supplier": "1",
    "Month": "1996-11-05",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 15,
    "Supplier": "1",
    "Month": "1986-06-28",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 16,
    "Supplier": "0",
    "Month": "1990-09-05",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 17,
    "Supplier": "2",
    "Month": "1994-11-19",
    "Number": "0",
    "Acount": "8.8万"
  },
  {
    "key": 18,
    "Supplier": "0",
    "Month": "2002-04-07",
    "Number": "1",
    "Acount": "8.8万"
  },
  {
    "key": 19,
    "Supplier": "1",
    "Month": "1990-05-10",
    "Number": "0",
    "Acount": "8.8万"
  },
  {
    "key": 20,
    "Supplier": "1",
    "Month": "1985-04-28",
    "Number": "1",
    "Acount": "8.8万"
  }
]

const template =
  [
    {
      "key": 1,
      "title": "高中冬季菜单高营养",
      "subTitle": "10次",
      "meal": "午餐",
      "subMeal": "上次使用",
      "data": "一,二,三,四,五",
      "subData": "2001-06-08",
      "create": "1996-03-24",
      "modify": "1986-05-24"
    },
    {
      "key": 2,
      "title": "模板名称",
      "subTitle": "8次",
      "meal": "午餐",
      "subMeal": "未使用",
      "data": "一,二,三,四,五",
      "subData": "1995-03-11",
      "create": "1984-06-09",
      "modify": "1971-04-25"
    },
    {
      "key": 3,
      "title": "模板名称",
      "subTitle": "10次",
      "meal": "午餐",
      "subMeal": "上次使用",
      "data": "一,二,三,四,五",
      "subData": "1998-11-08",
      "create": "2005-06-30",
      "modify": "1988-01-28"
    },
    {
      "key": 4,
      "title": "高中冬季菜单高营养",
      "subTitle": "10次",
      "meal": "午餐",
      "subMeal": "上次使用",
      "data": "一,二,三,四,五",
      "subData": "1990-11-17",
      "create": "2009-04-11",
      "modify": "1987-04-09"
    },
    {
      "key": 5,
      "title": "高中冬季菜单高营养",
      "subTitle": "8次",
      "meal": "午餐",
      "subMeal": "上次使用",
      "data": "一,二,三,四,五",
      "subData": "1974-08-03",
      "create": "2010-11-29",
      "modify": "1984-01-08"
    },
    {
      "key": 6,
      "title": "中小学夏季菜单1餐5日",
      "subTitle": "8次",
      "meal": "午餐",
      "subMeal": "未使用",
      "data": "一,二,三,四,五",
      "subData": "2011-04-08",
      "create": "1971-05-29",
      "modify": "1973-01-10"
    },
    {
      "key": 7,
      "title": "高中冬季菜单高营养",
      "subTitle": "8次",
      "meal": "午餐",
      "subMeal": "上次使用",
      "data": "一,二,三,四,五",
      "subData": "2014-12-27",
      "create": "1977-08-01",
      "modify": "2009-09-02"
    },
    {
      "key": 8,
      "title": "模板名称",
      "subTitle": "12次",
      "meal": "午餐",
      "subMeal": "上次使用",
      "data": "一,二,三,四,五",
      "subData": "1976-05-21",
      "create": "1994-12-02",
      "modify": "1990-11-15"
    },
    {
      "key": 9,
      "title": "模板名称",
      "subTitle": "12次",
      "meal": "午餐",
      "subMeal": "上次使用",
      "data": "一,二,三,四,五",
      "subData": "1976-05-21",
      "create": "1994-12-02",
      "modify": "1990-11-15"
    },
  ]

export { delivery, parameter, template , pendingDeliveryDetail }