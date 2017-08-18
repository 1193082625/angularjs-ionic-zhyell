'use strict';
app.factory('HttpService', ["$http","$q",function ($http,$q) {
  var service = {};
  var urlroot = "https://api.zhyell.com";
  service.getData = function(params) {
    var deferred = $q.defer();
    var url = urlroot + params[0]['url'];
    $http({
      url: url,
      method: 'GET',
      params: params[1]
    }).success(function (data) {
      //业务处理
      deferred.resolve(data);
    }).error(function (error) {
      //业务处理
      deferred.reject(error)
    })
    return deferred.promise;
  }
  service.postData = function (params) {
    var deferred = $q.defer();
    var url = urlroot + params[0]['url'];
    $.post(url,params[1]).success(function (data) {
      //业务处理
      deferred.resolve(data);
    }).error(function (error) {
      //业务处理
      deferred.reject(error)
    })
    return deferred.promise;
  }

  return service;
}])
