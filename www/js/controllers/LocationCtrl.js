'use strict'

app.controller('LocationCtrl', ["$scope", "$rootScope", "$stateParams", "$ionicHistory", "HttpService", "GlobalParamService", function ($scope, $rootScope, $stateParams, $ionicHistory, HttpService, GlobalParamService) {

  $scope.data = {
    myLocation: $stateParams.address,
    viewCityTitle: '',
    viewCityTitleZH: '',
    curCityTitle: '',
    ProvinceList: null,
    ejCity: null,
    viewCity: null,
    curCity: null,
    firstpush11: false,
    firstpush12: false,
    firstpush31: false,
    firstpush50: false

  }

  var codeParams = [
    {
      url:'/api/common/getAllRegion'
    }
  ];
  HttpService.getData(codeParams).then(function (result) {
    if(result.msg.status == 0){
      $scope.data.ProvinceList = result.data.region;
    }
  }, function (err) {
    console.log(err);
  })

  //获取市
  $scope.getCurCity = function (myProvince) {
    if(myProvince.code==11 || myProvince.code==12 || myProvince.code==31 || myProvince.code==50){
      $scope.data.viewCityTitle = myProvince.name;
      $scope.data.curCityTitle = '';
      $scope.data.viewCityTitleZH = myProvince.name + '下辖地区';

      $scope.data.viewCity = [];
      $scope.data.viewCity = myProvince.children;

      var firstload = 'firstpush' + myProvince.code;
      if($scope.data[firstload]){
        $scope.data.viewCity.push.apply($scope.data.viewCity,myProvince.children[0].children);
        $scope.data[firstload] = true;
      }

      $scope.data.curCity = null;
    }else if(myProvince.code.length == 2){
      $scope.data.curCityTitle = myProvince.title;
      $scope.data.curCity = myProvince.children;
      $scope.getViewCity($scope.data.curCity[0]);
    }
  }
  $scope.getViewCity = function (myCity) {
    $scope.data.viewCityTitle = myCity.name;
    $scope.data.viewCityTitleZH = myCity.name + '下辖地区';
    $scope.data.ejCity = myCity;
    $scope.data.viewCity = myCity.children;
  }
  //切换城市
  $scope.changeCity = function (chooseLocationParams) {
    if(chooseLocationParams.name == "市区"){
      chooseLocationParams.name =  $scope.data.viewCityTitle;
    }
    chooseLocationParams.parentName = $scope.data.viewCityTitle;
    $rootScope.$broadcast('homeChangeCity', chooseLocationParams);//angularjs广播，在不同controller之间共享数据
    GlobalParamService.set('regionCode',chooseLocationParams.code);
    $ionicHistory.goBack();
  }
}])
