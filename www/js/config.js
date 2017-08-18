/**
 * Created by 小虎Oni on 2016/5/19.
 */
'use strict';

// 使用$provide.constant来定义了一个静态变量(见app.js中的config的配置)
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Controllers
        'HomeCtrl':"js/controllers/HomeCtrl.js",
        'HydqCtrl':"js/controllers/hydq/HydqCtrl.js",
        'ZmqyCtrl': "js/controllers/hydq/ZmqyCtrl.js",
        'PpzqCtrl': "js/controllers/hydq/PpzqCtrl.js",
        'PpzqListCtrl': "js/controllers/hydq/PpzqListCtrl.js",
        'JphyCtrl': "js/controllers/hydq/JphyCtrl.js",
        'ClassifyCtrl': "js/controllers/ClassifyCtrl.js",
        'MclassifyCtrl': "js/controllers/merchant/MclassifyCtrl.js",
        'MlistCtrl': "js/controllers/merchant/MlistCtrl.js",
        'MdetailsCtrl': "js/controllers/merchant/MdetailsCtrl.js",
        'BusinessViewCtrl': "js/controllers/merchant/BusinessViewCtrl.js",
        'LocationCtrl':"js/controllers/LocationCtrl.js",
        'SearchCtrl': "js/controllers/SearchCtrl.js",
        //*** Services
        'HttpService':"js/services/HttpService.js",
        'GlobalParamService': "js/services/GlobalParamService.js",
        //*** Filter
        'SpritFilter': "js/filter/SpritFilter.js",
        //*** 第三方
        // 高德地图
        'gaodees5': "https://cache.amap.com/lbs/static/es5.min.js",
    },
    CssArg:{
      FooterStyle:'css/footer.css',
      HomeStyle: 'css/home.css',
      HydqStyle: 'css/hydq.css',
      ZmqyStyle: 'css/zmqy.css',
      PpzqStyle: 'css/ppzq.css',
      PpzqListStyle: 'css/ppzq-list.css',
      JphyStyle: 'css/jphy.css',
      ClassifyStyle: 'css/classify.css',
      MlistStyle: 'css/mlist.css',
      MdetailsStyle: 'css/mdetails.css',
      BusinessViewStyle: 'css/businessView.css',
      LocationStyle: 'css/location.css',
      SearchStyle: 'css/search.css',
      // 高德地图
      main1119:'https://cache.amap.com/lbs/static/main1119.css',
      //字体
      FontStyle: 'https://cdn.webfont.youziku.com/webfonts/nomal/91857/45905/59891edef629d80584f10c0c.css'
    },
    ViewArgs: {
      HomeArgs: ['HomeCtrl', 'HttpService', 'GlobalParamService', 'gaodees5', 'FooterStyle', 'HomeStyle', 'main1119'],
      HydqArgs: ['HydqCtrl', 'HttpService', 'GlobalParamService', 'SpritFilter', 'FooterStyle', 'HydqStyle','FontStyle'],
      ZmqyArgs: ['ZmqyCtrl', 'HttpService', 'GlobalParamService', 'ZmqyStyle', 'FooterStyle'],
      PpzqArgs: ['PpzqCtrl', 'HttpService', 'GlobalParamService', 'PpzqStyle', 'FooterStyle'],
      PpzqListArgs: ['PpzqListCtrl', 'HttpService', 'GlobalParamService', 'PpzqListStyle', 'FooterStyle'],
      JphyArgs: ['JphyCtrl', 'HttpService', 'GlobalParamService', 'SpritFilter', 'JphyStyle', 'FooterStyle'],
      ClassifyArgs: ['ClassifyCtrl', 'HttpService', 'GlobalParamService', 'ClassifyStyle'],
      MclassifyArgs: ['MclassifyCtrl', 'HttpService', 'GlobalParamService', 'SpritFilter'],
      MlistArgs: ['MlistCtrl', 'HttpService', 'GlobalParamService', 'MlistStyle'],
      MdetailsArgs: ['MdetailsCtrl', 'HttpService', 'GlobalParamService', 'MdetailsStyle'],
      BusinessViewArgs: ['BusinessViewCtrl', 'HttpService', 'GlobalParamService', 'BusinessViewStyle'],
      LocationArgs: ['LocationCtrl', 'HttpService', 'GlobalParamService','LocationStyle'],
      SearchArgs: ['SearchCtrl', 'ClassifyCtrl', 'HttpService', 'GlobalParamService', 'SearchStyle']
    }
});
