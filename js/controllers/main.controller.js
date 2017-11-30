(function () {
    'use strict';

    angular
        .module('CRM')
        .controller('CRMController', CRMController);

    CRMController.$inject = ['$scope'];

    function CRMController($scope) {
        //////////// scope functions //////////
        $scope.customerCompleted = customerCompleted;
        $scope.cancelButton = cancelButton;
        $scope.updateCustomer = updateCustomer;
        $scope.createNewCustomer = createNewCustomer;
        $scope.editCustomer = editCustomer;
        $scope.removeCustomer = removeCustomer;

        //////////// scope vars ////////////
        $scope.newCustomer = {};
        $scope.customers = [];
        $scope.editing = false;
        $scope.studiesOptions = ['Primaria', 'Secundaria', 'Bachillerato', 'Ciclo o  Grado'];

        activate();

        ////////////////////////

        function activate() {

            // TODO: Carga los usuarios del localStorage

        }

        function customerCompleted() {
            return $scope.newCustomer.name && $scope.newCustomer.photo &&
                $scope.newCustomer.email && $scope.newCustomer.age;
        }

        function cleanForm() {
            $scope.newCustomer = {};
        }

        function cancelButton() {
            if ($scope.editing) $scope.editing = false;
            cleanForm();
        }

        function createNewCustomer() {
            if (customerCompleted()) {
                $scope.newCustomer.id = randId();
                $scope.customers.push($scope.newCustomer);
                cleanForm();
            }
        }

        function editCustomer(customer) {
            $scope.newCustomer = angular.copy(customer);
            $scope.editing = true;
        }

        function updateCustomer(customer) {
            $scope.customers.forEach(function (customerToEdit, idx) {
                if (customer.id == customerToEdit.id) $scope.customers[idx] = customer;
            });
            $scope.editing = false;
            cleanForm();
        }

        function removeCustomer(customer) {
            var confirmation = prompt(`Seguro que deseas borrar al usuario ? Introduce ${customer.name} para confirmar`);
            if (confirmation == customer.name) {
                $scope.customers.forEach(function (customerToRemove, idx) {
                    if (customer.id == customerToRemove.id) {
                        $scope.customers.splice(idx, 1);
                    }
                });
                // $scope.customers = $scope.customers.filter(c => c.id != customer.id);
            }
        }

        //////// Storage /////
        function loadLocalStorage() {

        }

        function updateLocalStorage() {

        }
        ///////// end Storage ////////

        ///////// auxiliars  /////////
        function randId() {
            return Math.random().toString(36).substr(2, 20);
        }
    }
})();