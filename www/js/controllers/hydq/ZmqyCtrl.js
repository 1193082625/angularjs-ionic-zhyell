'use strict';
app.controller('ZmqyCtrl', ["$scope", "$rootScope", "HttpService", "GlobalParamService", function ($scope, $rootScope, HttpService, GlobalParamService) {
  $scope.data = {
    myRegionCode: GlobalParamService.get("regionCode"),
    myLocation: GlobalParamService.getObject("location"),
    address: GlobalParamService.getObject("address"),
    dataList: [],
    otherList: [],
    pageValue:1,//页数
    contentKeywords:'',
    RegionName:'',
    RegionCode:''
  }
  //监听城市是否切换
  $rootScope.$on('homeChangeCity', function(event, data) {//如果切换了城市则改变当前值
    $scope.data.address.RegionName = data.parentName;
    $scope.data.address.address = data.name;
    $scope.data.address.RegionCode = data.code;
    $scope.data.RegionName = data.name;
    $scope.data.RegionCode = data.code;
    $scope.data.myRegionCode = data.code;
    GlobalParamService.set('regionCode',data.code);
    GlobalParamService.setObject("address",$scope.data.address);

    $scope.getList();
  });

  // 获取列表
  $scope.getList = function () {
    //  知名企业
    var params1 = [
      {
        url: '/api/recommend/list'
      },{
        regionCode:$scope.data.myRegionCode
      }
    ];
    HttpService.postData(params1).then(function (result) {
      $scope.data.dataList = result.data.recommend
    }, function (err) {
      console.log(err);
    })

    //  知名企业
    var params2 = [
      {
        url: '/api/recommend/listGb'
      }, {
        regionCode:$scope.data.myRegionCode
      }
    ];
    HttpService.postData(params2).then(function (result) {
      $scope.data.otherList = result.data.gbList
    }, function (err) {
      console.log(err);
    })
  }
  $scope.getList();
}])
