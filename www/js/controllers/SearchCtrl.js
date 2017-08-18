'use strict';
app.controller('SearchCtrl', ["$scope", "$rootScope", "$stateParams", "$cacheFactory", "$ionicHistory", "$state", "HttpService", "GlobalParamService", function ($scope, $rootScope, $stateParams, $cacheFactory, $ionicHistory, $state, HttpService, GlobalParamService) {
  $scope.data = {
    showItems: false,
    address: GlobalParamService.getObject("address"),
    name: $stateParams.name,
    searchValue: '114黄页',
    searchVal: 'a',
    showChooseItem: false,
    contentKeywords:'',
    RegionName:'',
    historyArray: [],
    shortLists: []
  }
  if($scope.data.name == 'index'){
    $scope.data.showChooseItem = true;
  }else{
    $scope.data.showChooseItem = false;
  }

  var ahistory = GlobalParamService.getObject('homeSearchHistory')
  if(!isEmptyObject(ahistory)){
    $scope.data.historyArray = ahistory
  }

  // 监听搜索历史
  $rootScope.$on('SearchHistory', function(event, data) {
    $scope.data.historyArray = data;
  })

  $scope.setSearchTab = function (value,name) {
    $scope.data.searchVal = value;
    $scope.data.searchValue = name;
    $scope.data.showItems = false;
  }
  //搜索商家
  $scope.searchContent = function () {
    if ($scope.data.searchVal != 'a') {
      //添加除黄页之外的搜索历史
      if ($scope.data.contentKeywords.trim() != "") {
        var newValue = {
          'val': $scope.data.searchVal,
          'name': $scope.data.contentKeywords,
          completed: false
        }
        if ($scope.data.historyArray.length > 0) {
          if (isNSameObject($scope.data.historyArray, newValue)) {
            $scope.data.historyArray.push(newValue);
          }
        } else {
          $scope.data.historyArray.push(newValue);
        }
      }

      //只取数组的前8个记录
      if ($scope.data.historyArray.length > 8) {
        $scope.data.historyArray.splice(0, $scope.data.historyArray.length - 8);
      }
      GlobalParamService.setObject('homeSearchHistory', $scope.data.historyArray);
    }

    // if ($scope.data.searchVal == 'a'){
    //   var searchParam = {};
    //   var myLocation = GlobalParamService.getObject("location");
    //   var myRegionCode = GlobalParamService.get("regionCode");
    //   searchParam = {
    //     page:'1',
    //     limit:'20',
    //     keywords:$scope.data.contentKeywords,
    //     regionCode:myRegionCode,
    //     lat:myLocation.lat,
    //     lng:myLocation.lng,
    //     categoryCode:''
    //   }
    //   var user_cache = $cacheFactory("homeSearch_cache");  //声明一个user_cache缓存对象
    //   user_cache.put("params",searchParam);    //放入缓存对象
    //   $state.go("Mlist",{id:'none','name':$scope.data.contentKeywords});
    // } else if ($scope.data.searchVal == 'b'){
    //   window.location.href = "http://www.wolive114.com/index.php?g=Release&c=Waps&a=lists&key=" + $scope.data.contentKeywords
    // } else if ($scope.data.searchVal == 'c'){
    //   window.location.href = "http://shop.zhyell.com/mobile/index.php?m=category&a=search&keyword=" + $scope.data.contentKeywords
    // }

    $scope.searchContent1($scope.data.searchVal, $scope.data.contentKeywords);
  }
  //点击历史搜索中黄页的搜索历史
  $scope.searchContent1 = function (value,name) {
    if (value == 'a') {
      var searchParam = {};
      var myLocation = GlobalParamService.getObject("location");
      var myRegionCode = GlobalParamService.get("regionCode");
      searchParam = {
        page: '1',
        limit: '20',
        keywords: name,
        regionCode: myRegionCode,
        lat: myLocation.lat,
        lng: myLocation.lng,
        categoryCode: ''
      }
      var user_cache = $cacheFactory("homeSearch_cache");  //声明一个user_cache缓存对象
      user_cache.put("params", searchParam);    //放入缓存对象
      $state.go("Mlist", {id: 'none', 'name': name});
    } else if (value == 'b'){
      window.location.href = "http://www.wolive114.com/index.php?g=Release&c=Waps&a=lists&key=" + name
    } else if (value == 'c'){
      window.location.href = "http://shop.zhyell.com/mobile/index.php?m=category&a=search&keyword=" + name
    }
  }

  $scope.clearHistory = function () {
    $scope.data.historyArray = [];
    GlobalParamService.setObject('homeSearchHistory',[]);
  }

  $scope.goback = function () {
    $state.go("home");
  }

  //判断全局参数搜索历史是否是空对象
  function isEmptyObject(e) {
    var t;
    for (t in e)
      return !1;
    return !0
  }
  //判断搜索历史与当前搜索是否一样
  function isNSameObject(e,newValue) {
    var i;
    for(i in e){
      if(newValue.val == e[i].val && newValue.name == e[i].name){
        return false
      }
    }
    return true
  }

  $scope.goback = function () {
    $ionicHistory.goBack();
  }
  //获取快捷键列表
  $scope.getAllList = function () {
    var params = [
      {
        url:'/api/users/getAllCategory'
      }
    ];
    HttpService.getData(params).then(function (result) {
      $scope.data.shortLists = result.data.category;
    }, function (err) {
      console.log(err)
    })
  }
  $scope.getAllList();

  $scope.goNext = function (codeValue,nameValue) {
    if(codeValue == '4444'){//供求信息
      $state.go("gqdList");
    }else if(codeValue == '5555'){//便民服务
      $state.go("bmfwClassify");
    }else {//商家分类列表
      $state.go("classify",{id:codeValue,'name':nameValue});
    }
  }

}])
