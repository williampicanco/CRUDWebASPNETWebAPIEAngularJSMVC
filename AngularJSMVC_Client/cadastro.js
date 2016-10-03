/// <reference path="c:\users\wiliam\documents\visual studio 2015\Projects\CRUDWebASPNETWebAPIEAngularJSMVC\AngularJSMVC_Client\scripts/angular.js" />
var MyApp = angular.module("MyApp", ['ngRoute', 'ClienteService']);
//Configurações para as Rotas do C.R.U.D. -> HomeController;EditController;AddController;DeleteController.
MyApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/Add', {
                templateUrl: 'Views/add.html',
                controller: 'AddController'
            }).
            when('/Edit', {
                templateUrl: 'Views/edit.html',
                controller: 'EditController'
            }).
            when('/Delete', {
                templateUrl: 'Views/delete.html',
                controller: 'DeleteController'
            }).
            when('/Home', {
                templateUrl: 'Views/home.html',
                controller: 'HomeController'
            }).
            otherwise({
                redirectTo: '/Home'
            });
    }]);

MyApp.controller("AddController", function ($scope, CliApi) {

    $scope.addCli = function() {
        var cliToAdd = {
            'Nome':$scope.nome,
            'Telefone':$scope.tel,
            'Endereco':$scope.end
        };        
        CliApi.AddCliente(cliToAdd)
                    .success(function (response) {
                        alert("Cliente cadastrado");
                        $scope.nome = undefined;
                        $scope.tel = undefined;
                        $scope.end = undefined;
                    }).
        error(function (response) {
            alert("Erro ao adicionar! O Nome é obrigatório.");
        });          
    }

});

MyApp.controller("DeleteController", function ($scope, CliApi) {

    $scope.selectedItem = "Selecione o Cliente";
    $scope.isDeleteItemVisible = false;
    getClientes();
    function getClientes() {
        CliApi.getClientes().success(function (clis) {
            $scope.clis = clis;
        })
        .error(function (error) {
            $scope.status = 'Não foi possível carregar os dados: ' + error.message;
        })
    };

    $scope.dropboxitemselected = function (item) {

        $scope.selectedItem        = item.ClienteId;
        $scope.nome                = item.Nome;
        $scope.tel                 = item.Telefone;
        $scope.end                 = item.Endereco;
        $scope.cliid               = item.ClienteId;
        $scope.isDeleteItemVisible = true;
    };
    $scope.DeleteCli = function () {
        var cliToDelete = {
            'ClienteId': $scope.cliid
        };

        CliApi.DeleteCliente(cliToDelete)
                   .success(function (response) {
                       alert("Cliente excluido");
                       $scope.nome = undefined;
                       $scope.tel = undefined;
                       $scope.end = undefined;
                       $scope.cliid = undefined;
                       $scope.selectedItem = "Selecione o Cliente";
                       $scope.isDeleteItemVisible = false;
                       getClientes();
                   })
                   .error(function (response) {
                       alert("erro na exclusão")
                   });
    }
});

MyApp.controller("EditController", function ($scope, CliApi) {

    $scope.selectedItem = "Selecione o Cliente";
    $scope.isDeleteItemVisible = false;
    getClientes();
    function getClientes() {
        CliApi.getClientes().success(function (clis) {
            $scope.clis = clis;
        })
        .error(function (error) {
            $scope.status = 'Não foi possível carregar os dados: ' + error.message;
        })
    };

    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.ClienteId;
        $scope.nome         = item.Nome;
        $scope.tel          = item.Telefone;
        $scope.end          = item.Endereco;
        $scope.cliid        = item.ClienteId;
    };

    $scope.UpdateCli = function () {

        var cliToUpdate = {
            'ClienteId': $scope.cliid,
            'Nome'     : $scope.nome,
            'Telefone' : $scope.tel,
            'Endereco' : $scope.end
        };

        CliApi.EditCliente(cliToUpdate)
                   .success(function (response) {
                       alert("Edição concluída");
                       $scope.nome  = undefined;
                       $scope.tel   = undefined;
                       $scope.end   = undefined;
                       $scope.cliid = undefined;
                       $scope.selectedItem = "Select Cliente";
                       $scope.isDeleteItemVisible = false;
                       getClientes();
                   })
            .error(function (response) {
                alert("erro na edição")
            });
    }
});

MyApp.controller("HomeController", function ($scope, CliApi) {

    getClientes();
    function getClientes() {
        CliApi.getClientes().success(function (clis) {
            $scope.clis = clis;
        })
        .error(function (error) {
            $scope.status = 'Não é possível carregar os dados do Cliente: ' + error.message;
        })
    }
});