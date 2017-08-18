// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'oc.lazyLoad'])

  .run(["$ionicPlatform","$rootScope","$ionicLoading",function ($ionicPlatform,$rootScope,$ionicLoading) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    $rootScope.$on('loading:show',function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="ios-small"></ion-spinner>',
        animation: 'fade-in',
        maxWidth: 200,
        showDelay: 0
      });
    });

    $rootScope.$on('loading:hide',function () {
      $ionicLoading.hide();
    })
  }])

.config(['$stateProvider', '$ionicConfigProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', "$locationProvider", 'JS_REQUIRES',
    function($stateProvider,$ionicConfigProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, $locationProvider, jsRequires) {
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    prefetchTemplate:false, // 不会提前加载html
    controller: 'HomeCtrl',
    resolve: loadSequence('HomeArgs') // 只需要一个文件的时候，直接写文件名
  })
  .state('hydq', {
    url: '/hydq',
    templateUrl: 'templates/hydq/index.html',
    prefetchTemplate:false,
    controller: 'HydqCtrl',
    resolve: loadSequence('HydqArgs')
    // 这里需要一个模块，直接写模块名称 —— 查看config,js中的调用
  })
  .state('zmqy', {
    url:'/zmqy',
    templateUrl: 'templates/hydq/zmqy.html',
    prefetchTemplate: false,
    controller: 'ZmqyCtrl',
    resolve: loadSequence('ZmqyArgs')
  })
  .state('ppzq', {
    url:'/ppzq',
    templateUrl: 'templates/hydq/ppzq.html',
    prefetchTemplate: false,
    controller: 'PpzqCtrl',
    resolve: loadSequence('PpzqArgs')
  })
  .state('ppzqList', {
    url: '/ppzqList/:businessId/:sqregionCode',
    templateUrl: 'templates/hydq/ppzq-list.html',
    prefetchTemplates: false,
    controller: 'PpzqListCtrl',
    resolve: loadSequence('PpzqListArgs')
  })
  .state('jphy', {
    url: '/jphy',
    templateUrl: 'templates/hydq/jphy.html',
    prefetchTemplate: false,
    controller: 'JphyCtrl',
    resolve: loadSequence('JphyArgs')
  })
  .state('classify', {
    url: '/classify',
    templateUrl: 'templates/classify.html',
    prefetchTemplate: false,
    controller: 'ClassifyCtrl',
    resolve: loadSequence('ClassifyArgs')
  })
  .state('mclassify', {
    url: '/mclassify/:id/:name',
    templateUrl: 'templates/merchant/classify.html',
    prefetchTemplate: false,
    controller: 'MclassifyCtrl',
    resolve: loadSequence('MclassifyArgs')
  })
  .state('Mlist', {
    url: '/Mlist/:id/:name',
    templateUrl: 'templates/merchant/list.html',
    prefetchTemplate: false,
    controller: 'MlistCtrl',
    resolve: loadSequence('MlistArgs')
  })
  .state('Mdetails', {
    url: '/Mdetails/:id',
    templateUrl: 'templates/merchant/details.html',
    prefetchTemplate: false,
    controller: 'MdetailsCtrl',
    resolve: loadSequence('MdetailsArgs')
  })
  .state('merchant', {
    url: '/merchant/:id',
    templateUrl: 'templates/merchant/details.html',
    prefetchTemplate: false,
    controller:'MdetailsCtrl',
    resolve: loadSequence('MdetailsArgs')
  })
  .state('app/shops', {
    url: '/app/shops/:id',
    templateUrl: 'templates/merchant/details.html',
    prefetchTemplate: false,
    controller:'MdetailsCtrl',
    resolve: loadSequence('MdetailsArgs')
  })
  .state('businessView', {
    url: '/businessView/:id',
    templateUrl: 'templates/merchant/businessView.html',
    prefetchTemplate: false,
    controller:'BusinessViewCtrl',
    resolve: loadSequence('BusinessViewArgs')
  })
  .state('location', {
    url: '/location/:address',
    templateUrl: 'templates/location.html',
    prefetchTemplate: false,
    controller: 'LocationCtrl',
    resolve: loadSequence('LocationArgs')
  })
  .state('search', {
    url: '/search/:name',
    templateUrl: 'templates/search.html',
    prefetchTemplate: false,
    controller: 'SearchCtrl',
    resolve: loadSequence('SearchArgs')
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

  // 去除路由中的#号，还需要后台转一下路由
  // $locationProvider.html5Mode(true);

    function loadSequence() {
      var _args = arguments; // 穿不穿参数都能匹配到
      var viewArgs = repeatArgs(_args[0]);
      //先匹配模块的，没有再匹配单文件的
      if(viewArgs){
        // 先匹配模块，找到就把模块对应的单文件列表返回给它，找不到就当做是单文件列表
        _args = viewArgs
      }else{
      //console.log("没有找到模块?")
      }
      function repeatArgs(name){
        return jsRequires.ViewArgs[name];
      }
      return {
        // 使用oclazyload和$q的组合实现懒加载
        deps: ['$ocLazyLoad', '$q',
          function ($ocLL, $q) {
            var promise = $q.when(1);
            for (var i = 0, len = _args.length; i < len; i++) {
              promise = promiseThen(_args[i]);
            }
            return promise;
            function promiseThen(_arg) {
              if (typeof _arg == 'function')
                return promise.then(_arg);
              else
                return promise.then(function () {
                  var nowLoad = requiredData(_arg);
                  if (!nowLoad)
                    return console.log('找不到文件 [' + _arg + ']');
                  return $ocLL.load(nowLoad);
                });
            }
            function requiredData(name) {

              if (jsRequires.modules)
                for (var m in jsRequires.modules)
                  if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                    return jsRequires.modules[m];

              if(jsRequires.scripts && jsRequires.scripts[name]){
                return jsRequires.scripts[name];
              }else if(jsRequires.CssArg && jsRequires.CssArg[name]){
                return jsRequires.CssArg[name];
              }
              // return jsRequires.scripts && jsRequires.scripts[name];
            }
          }]};}
}]);
