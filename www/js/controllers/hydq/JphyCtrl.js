'use strict';
app.controller('JphyCtrl', ["$scope", "$rootScope", "$ionicScrollDelegate", "$state", "HttpService", "GlobalParamService", function ($scope, $rootScope, $ionicScrollDelegate, $state, HttpService, GlobalParamService) {
  $scope.data = {
    address: GlobalParamService.getObject("address"),
    myRegionCode: GlobalParamService.get("regionCode"),
    myLocation: GlobalParamService.getObject("location"),
    jphyList: [],
    pageValue:1//页数
  }
  //监听城市是否切换
  $rootScope.$on('homeChangeCity', function(event, data) {//如果切换了城市则改变当前值
    $scope.data.address.RegionName = data.parentName;
    $scope.data.address.address = data.name;
    $scope.data.address.RegionCode = data.code;
    $scope.data.myRegionCode = data.code;
    GlobalParamService.set('regionCode',data.code);
    GlobalParamService.setObject("address",$scope.data.address);
  });

  $scope.goNext = function (codeValue,nameValue) {
    if(codeValue == '4444'){//供求信息
      $state.go("gqdList");
    }else if(codeValue == '5555'){//便民服务
      $state.go("bmfwClassify");
    }else {//商家分类列表
      $state.go("mclassify",{id:codeValue,'name':nameValue});
    }
  }
  $scope.getJPHY = function () {
    var jphyParams = [
      {
        url: '/api/recommend/gbCategory'
      }
    ];
    HttpService.postData(jphyParams).then(function (result) {
      $scope.data.jphyList = result.data.gbCategory;
    }, function (err) {
      console.log(err);
    })
  }
  $scope.getJPHY();
  $scope.goItems = function (itemId) {
    var _height = $('#jphy'+itemId).offset().top - $(document).scrollTop();
    $ionicScrollDelegate.scrollTo(0,_height)
  }
}])
