/**
 * Created by
 */
'use strict';

app.controller('HomeCtrl', ["$scope", "$rootScope", "HttpService", "GlobalParamService", "$timeout",function($scope, $rootScope, HttpService, GlobalParamService, $timeout) {
  $scope.address = {
    RegionName:'石家庄市',
    address:'石家庄市',
    RegionCode:'130101'
  };
  $scope.data = {
    hasSessionId: false
  };
  var sessionId = GlobalParamService.get('sessionID');
  //判断是否已登录，如果登录，则将该数据添加到历史浏览记录
  if(sessionId != undefined && sessionId!= ''){
    $scope.data.hasSessionId = true;
  }else{
    $scope.data.hasSessionId = false;
  }
  //退出登录
  $scope.quitLogin = function () {
  //   var params = [
  //     {
  //       url:'/api/login/signOut'
  //     },{
  //       sessionId:sessionId
  //     }
  //   ]
  //   HttpService.getData(params).then(function (result) {
  //     console.log(result)
  //     // alert(result.msg.desc);
  //     // if(result.msg.status == 0){
  //     //   globalParam.set('sessionID','');
  //     //   globalParam.set("goBackLogin",false);
  //     //   $scope.data.hasSessionId = false;
  //     //   // $state.go("login");
  //     // }
  //   }, function (error) {
  //     console.log(error)
  //   });
  }

  GlobalParamService.setObject("address",$scope.address);
  GlobalParamService.setObject('location',{"lat":38.0508,"lng":114.5151,"address":"石家庄市"});
  GlobalParamService.set('regionCode',$scope.address.RegionCode);

  //高德定位获取详细地址
  $scope.refreshAddress = function () {
    // //弹出缓冲提示
    // $rootScope.$broadcast('loading:show');
    // //这里使用定时器是为了缓存一下加载过程，防止加载过快
    // $timeout(function () {
    //   //停止缓冲提示
    //   $rootScope.$broadcast('loading:hide');
    // }, 1000);

    var map, geolocation;
    map = new AMap.Map('container', {
      resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 3000,          //超过1秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'RB'
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
  }
  $scope.refreshAddress();
  //解析定位结果
  function onComplete(data) {
    console.log("经度:"+data.position.getLng()+";纬度："+data.position.getLat());
    //详细的地址
    var siteParams = [
      {
        url:'/api/index/getAddress'
      },{
        lat:data.position.getLat(),//纬度
        lng:data.position.getLng()//经度
      }
    ];
    HttpService.getData(siteParams).then(function (siteResulte) {
      console.log(result)
      // $scope.address = siteResulte.data;
      // $scope.address.address = $scope.address.RegionName;
      // // alert('当前定位：' + $scope.address.address)
      // globalParam.setObject('location',{
      //   lat:data.position.getLat(),//纬度
      //   lng:data.position.getLng(),//经度
      //   address:siteResulte.data.address
      // });
      // globalParam.setObject("address",$scope.address);
      // globalParam.set('regionCode',$scope.address.RegionCode);
    }, function (error) {
      console.log(error)
    });
  }
  //解析定位错误信息
  function onError(data) {//定位失败
    console.log('定位失败')
    $scope.address.RegionName = '石家庄市';
    $scope.address.address = '石家庄市';
    $scope.address.RegionCode = '130101';
    GlobalParamService.setObject("address",$scope.address);
    GlobalParamService.setObject('location',{"lat":38.0508,"lng":114.5151,"address":"石家庄市"});
    GlobalParamService.set('regionCode',$scope.address.RegionCode);
  }

  //监听城市是否切换
  $rootScope.$on('homeChangeCity', function(event, data) {//如果切换了城市则改变当前值
    $scope.address.RegionName = data.parentName;
    $scope.address.address = data.name;
    $scope.address.RegionCode = data.code;
    GlobalParamService.set('regionCode',data.code);
    GlobalParamService.setObject("address",$scope.address);
  });
}]);
