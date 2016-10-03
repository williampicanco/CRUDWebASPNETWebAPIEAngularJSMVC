/// <reference path="c:\users\wiliam\documents\visual studio 2015\Projects\CRUDWebASPNETWebAPIEAngularJSMVC\AngularJSMVC_Client\scripts/angular.js" />

var ClienteService = angular.module('ClienteService', []);

ClienteService.factory('CliApi', function ($http) {

    var urlBase = "http://localhost:59421/api";
    var CliApi = {};
    CliApi.getClientes = function () {
        return $http.get(urlBase + '/Cliente');
    };
    CliApi.AddCliente = function (cli) {

        return $http.post(urlBase + '/Cliente/', cli)
    };
    CliApi.EditCliente = function (cliToUpdate) {

        var request = $http({
            method: 'put',
            url: urlBase + '/Cliente/' + cliToUpdate.ClienteId,
            data: cliToUpdate
        });
        return request;
    };
    CliApi.DeleteCliente = function (cliIdToDelete) {

        var request = $http({
            method: 'delete',
            url: urlBase + '/Cliente/' + cliIdToDelete.ClienteId
        });
        return request;
    };

    return CliApi;
});

