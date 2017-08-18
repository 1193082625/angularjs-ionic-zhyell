'use strict';
app.controller('MclassifyCtrl', ["$scope", "$stateParams", "HttpService", "GlobalParamService", function ($scope, $stateParams, HttpService, GlobalParamService) {
  $scope.data = {
    regionCode: GlobalParamService.get("regionCode"),
    location: GlobalParamService.getObject("location"),
    title: $stateParams.name,
    _code: $stateParams.id,
    tips: '',
    myDatas: []
  }

  var codeParams = [];
  if(($scope.data._code == '2222') || ($scope.data._code == '3333') || ($scope.data._code == '6666')){//龙头企业(2222),本地特色(3333),重点行业(6666)
    codeParams = [
      {
        url:'/api/merchant/getmerchantList2'
      },{
        code: $scope.data._code,
        regionCode: $scope.data.regionCode,
        lat: $scope.data.location.lat,
        lng:  $scope.data.location.lng
      }
    ];
    HttpService.getData(codeParams).then(function (result) {
      if(result.msg.status == 0){
        $scope.data.tips = "";
        $scope.data.myDatas = result.data.data;
      }else if(result.msg.status == 1){
        $scope.data.tips = result.msg.desc;
        $scope.data.myDatas = [];
      }else{
        alert(result.msg.desc);
      }
    }, function (err) {
      console.log(err)
    })
  }else{
    if($scope.data._code == 10){
      codeParams = [
        {
          url:'/api/category/getGovList2'
        },{
          regionCode: $scope.data.regionCode
        }
      ];
    } else{
      codeParams = [
        {
          url:'/api/common/getCategory'
        },{
          code: $scope.data._code
        }
      ];
    }
    HttpService.getData(codeParams).then(function (result) {
      if(result.msg.status == 0){
        $scope.data.tips = "";
        $scope.data.myDatas = result.data.category;
      }else if(result.msg.status == 1){
        $scope.data.tips = result.msg.desc;
        $scope.data.myDatas = [];
      }else{
        alert(result.msg.desc);
      }
    }, function (err) {
      console.log(err)
    })
  }
}])
