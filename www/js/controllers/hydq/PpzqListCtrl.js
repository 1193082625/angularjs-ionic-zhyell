'use strict';
app.controller('PpzqListCtrl', ["$scope", "$rootScope", "$stateParams", "HttpService", "GlobalParamService", function ($scope, $rootScope, $stateParams, HttpService, GlobalParamService) {
  $scope.data = {
    address: GlobalParamService.getObject("address"),
    myRegionCode: GlobalParamService.get("regionCode"),
    myLocation: GlobalParamService.getObject("location"),
    businessId: $stateParams.businessId,
    sqregionCode: $stateParams.sqregionCode,
    selectedSQ: $stateParams.businessId,
    sqList: [],
    dataList: [],
    pageValue: 1,
    itemLength: 0,
    hasmore: true
  }
  //监听城市是否切换
  $rootScope.$on('homeChangeCity', function(event, data) {//如果切换了城市则改变当前值
    $scope.data.address.RegionName = data.parentName;
    $scope.data.address.address = data.name;
    $scope.data.address.RegionCode = data.code;
    $scope.data.myRegionCode = data.code;
    GlobalParamService.set('regionCode',data.code);
    GlobalParamService.setObject("address",$scope.data.address);

    $scope.data.sqregionCode = data.code;
    $scope.getSQList()
  });
  // 获取商圈
  $scope.getSQList = function () {
    // 商圈列表
    var params = [
      {
        url: '/api/business/list'
      }, {
        regionCode:$scope.data.sqregionCode
      }
    ];
    HttpService.postData(params).then(function (result) {
      $scope.data.sqList = result.data.business;
    }, function (err) {
      console.log(err)
    })
  }
  $scope.getSQList();
  // 获取列表
  $scope.getList = function (pageNum,businessId,actionName) {
    $rootScope.$broadcast('loading:show');
    // 商圈列表
    var params = [
      {
        url: '/api/business/details'
      }, {
        businessId:businessId,
        page: pageNum,
        size: 20
      }
    ];
    HttpService.postData(params).then(function (result) {
      $scope.data.dataList = result.data.merchant
      if($scope.data.dataList.length != undefined) {
        $scope.data.itemLength = $scope.data.dataList.length;
      }
      $rootScope.$broadcast('loading:hide');
      if(actionName == 'refresh'){
        $scope.$broadcast('scroll.refreshComplete');
      }
    }, function (err) {
      console.log(err);
      $rootScope.$broadcast('loading:hide');
      if(actionName == 'refresh'){
        $scope.$broadcast('scroll.refreshComplete');
      }
    })
  }
  $scope.getList($scope.data.pageValue,$scope.data.businessId);
  $scope.$watch('data.dataList', function(newValue,oldValue){
    if(newValue != oldValue){
      $rootScope.$broadcast('loading:hide');
    }
  })
  //刷新
  $scope.doRefresh = function() {
    $scope.data.pageValue = '1';
    $scope.getList($scope.data.pageValue,$scope.data.businessId,'refresh');
  }
  //加载更多
  $scope.loadMore = function () {
    console.log("加载更多");
    $scope.data.pageValue = $scope.data.pageValue + 1;
    var moreParams = [
      {
        url: '/api/business/details'
      }, {
        businessId:$scope.data.businessId,
        page: $scope.data.pageValue,
        size: 20
      }
    ];
    HttpService.postData(moreParams).then(function (result) {
      if (result.data.merchant==null||result.data.merchant.length==0 || result.data.merchant) {
        $scope.data.hasmore=false;
      }else{
        $scope.data.dataList.push.apply($scope.data.dataList,result.data.merchant);
        if($scope.data.dataList.length != undefined) {
          $scope.data.itemLength = $scope.data.dataList.length;
        }
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function (err) {
      console.log(err)
      $scope.$broadcast('scroll.infiniteScrollComplete');
    })
  }

  $scope.sqChanged = function (selectedValue) {
    $scope.data.pageValue = 1;
    $scope.data.businessId = selectedValue;
    $scope.getList($scope.data.pageValue,$scope.data.businessId,'');
  }
}])
