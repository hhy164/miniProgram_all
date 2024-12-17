CurrencyConverterMini/
├── components/                # 组件目录
│   ├── currency-selector/     # 货币选择器组件
│   │   ├── index.js
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── amount-input/         # 金额输入组件
│   │   ├── index.js
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── result-list/          # 结果列表组件
│       ├── index.js
│       ├── index.wxml
│       └── index.wxss
├── utils/                    # 工具函数目录
│   ├── api.js               # API相关
│   ├── currency.js          # 货币相关工具
│   └── storage.js           # 存储相关
├── services/                 # 服务层
│   └── exchange.js          # 汇率服务
├── constants/               # 常量定义
│   └── currency.js          # 货币相关常量
└── pages/                   # 页面目录
    └── index/               # 主页
        ├── index.js
        ├── index.wxml
        └── index.wxss