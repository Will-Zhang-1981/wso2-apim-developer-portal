﻿(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('NewsCtrl', NewsCtrl);

  NewsCtrl.$inject = ['$routeParams', '$anchorScroll', '$location', '$scope'];

  function NewsCtrl($routeParams, $anchorScroll, $location, $scope) {
    var vm = this;

    vm.scrollTo = scrollTo;

    (function init() {
      $anchorScroll.yOffset = 100;
      vm.template = {
        name: $routeParams.guide + '.view.html',
        url: 'js/app/views/guides/' + $routeParams.guide + '.view.html'
      };
    })();

    function scrollTo(hash) { // jshint ignore:line
      if ($location.hash() !== hash) {
        $location.hash(hash);
      } else {
        $anchorScroll();
      }
    }

  }

})();
