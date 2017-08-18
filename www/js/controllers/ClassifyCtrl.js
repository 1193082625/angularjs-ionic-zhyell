'use strict';

app.controller('ClassifyCtrl', ["$scope", "$state", "HttpService", "GlobalParamService", function ($scope, $state, HttpService, GlobalParamService) {
  $scope.data = {
    shortLists: []
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
      $state.go("mclassify",{id:codeValue,'name':nameValue});
    }
  }
}])
