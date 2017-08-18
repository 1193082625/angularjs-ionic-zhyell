/**
 * Created by 小虎Oni on 2016/5/19.
 */
'use strict';

app.controller('HydqCtrl', ['$scope', "$rootScope", "$state", "$ionicScrollDelegate", "HttpService", "GlobalParamService",function($scope, $rootScope, $state, $ionicScrollDelegate, HttpService, GlobalParamService) {
  $scope.data = {
    jphyList: [],
    jphyotherList: [],
    address: GlobalParamService.getObject("address")
  }
  //监听城市是否切换
  $rootScope.$on('homeChangeCity', function(event, data) {//如果切换了城市则改变当前值
    $scope.address.RegionName = data.parentName;
    $scope.address.address = data.name;
    $scope.address.RegionCode = data.code;
    GlobalParamService.set('regionCode',data.code);
    GlobalParamService.setObject("address",$scope.address);
  });

  $scope.getJPHY = function () {
    var jphyParams = [
      {
        url: '/api/recommend/gbCategory'
      }
    ];
    HttpService.postData(jphyParams).then(function (result) {
      $scope.data.jphyList = result.data.gbCategory;
    }, function (error) {
      console.log(error)
    });
  }
  $scope.getJPHY();

  $scope.getJPHYother = function () {
    var jphyotherParams = [
      {
        url: '/api/recommend/gbCategoryOther'
      }
    ];
    HttpService.postData(jphyotherParams).then(function (result) {
      $scope.data.jphyotherList = result.data.gbCategoryOther;
    }, function (error) {
      console.log(error)
    });
  }
  $scope.getJPHYother();

  $scope.goNext = function (codeValue,nameValue) {
    if(codeValue == '4444'){//供求信息
      $state.go("gqdList");
    }else if(codeValue == '5555'){//便民服务
      $state.go("bmfwClassify");
    }else {//商家分类列表
      // window.location.href = "/classify/"+codeValue+"/"+nameValue;
      $state.go("mclassify",{id:codeValue,'name':nameValue});
    }
  }
  $scope.goItems = function (itemId) {
    var _height = $('#jphy'+itemId).offset().top - $(document).scrollTop();
    $ionicScrollDelegate.scrollTo(0,_height)
  }
}]);
