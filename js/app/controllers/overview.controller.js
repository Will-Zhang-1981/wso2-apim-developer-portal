(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('OverviewCtrl', OverviewCtrl);

  OverviewCtrl.$inject = ['$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function OverviewCtrl($http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

      APIService.call('applicationsGet', [0.0, 0.0])
        .then(applicationsGetResponse);

      APIService.call('subscriptionsGet', [0.0, 0.0])
        .then(subscriptionsGetResponse);

      function subscriptionsGetResponse(response) {
        if (response.status === 200) {
          vm.subscriptions = response.data.list;
        } else {
          AlertService.error("Problem retrieving subscription list");
        }
      }

      function applicationsGetResponse(response) {
        if (response.status === 200) {
          vm.applications = response.data.list;
        } else {
          AlertService.error("Problem retrieving application list");
        }
      }

  }

})();