'use strict';
app.controller('PpzqCtrl', ["$scope", "$rootScope", 'HttpService', 'GlobalParamService', function ($scope, $rootScope, HttpService, GlobalParamService) {
  $scope.data = {
    address: GlobalParamService.getObject("address"),
    myRegionCode: GlobalParamService.get("regionCode"),
    myLocation: GlobalParamService.getObject("location"),
    dataList: [],
    areaList: [],
    dataTips: "该地区没有商圈"
  }
  //监听城市是否切换
  $rootScope.$on('homeChangeCity', function(event, data) {//如果切换了城市则改变当前值
    $scope.data.address.RegionName = data.parentName;
    $scope.data.address.address = data.name;
    $scope.data.address.RegionCode = data.code;
    GlobalParamService.set('regionCode',data.code);
    GlobalParamService.setObject("address",$scope.data.address);

    $scope.getAreatList();
    $scope.getList($scope.data.myRegionCode);
  });
  //品牌专区周边地区
  $scope.getAreatList = function () {
    var nearParams = [
      {
        url: '/api/business/ppRegion'
      }, {
        regionCode:$scope.data.myRegionCode
      }
    ];
    HttpService.postData(nearParams).then(function (result) {
      $scope.data.areaList = result.data.region;
    }, function (err) {
      console.log(err);
    })
  }
  $scope.getAreatList();
  // 获取列表
  $scope.getList = function (regionCode) {
    $rootScope.$broadcast('loading:show');
    //  品牌专区
    var params = [
      {
        url: '/api/business/list'
      }, {
        regionCode:regionCode
      }
    ];
    HttpService.postData(params).then(function (result) {
      if(result.data.business){
        $scope.data.dataTips = '';
        $scope.data.dataList = result.data.business
      }else{
        $scope.data.dataTips = '该地区没有商圈'
        $scope.data.dataList = ''
      }
      $rootScope.$broadcast('loading:hide');
    }, function (err) {
      console.log(err);
      $rootScope.$broadcast('loading:hide');
    })
  }
  $scope.getList($scope.data.myRegionCode);
  $scope.$watch('data.dataList', function(newValue,oldValue){
    if(newValue != oldValue){
      $rootScope.$broadcast('loading:hide');
    }
  })
}])
