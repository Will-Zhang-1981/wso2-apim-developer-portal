/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityForumCtrl', CommunityForumCtrl);

  CommunityForumCtrl.$inject = ['AlertService', 'APIService', '$routeParams', '$scope'];

  function CommunityForumCtrl(AlertService, APIService, $routeParams, $scope) {
    var vm = this;

    vm.addTopic = addTopic;
    vm.resetAddTopicForm = resetAddTopicForm;

    (function init() {

      APIService.communityCall('forumsIdGet', [$routeParams.forumId])
        .then(categoriesIdGetResponse);

    })();

    function categoriesIdGetResponse(response) {
      if (response.status === 200) {
        vm.forum = response.data;

      } else {
        AlertService.error('Problem att hämta forum');
      }
    }

    function addTopic() {
      vm.dataLoadingAddTopic = true;

      APIService.communityCall('topicsPost', [{
          forumId: vm.forum.id,
          subject: vm.form.topic.subject
        }])
        .then(topicsPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att skapa topic');
          vm.dataLoadingAddTopic = false;
        });

      function topicsPostResponse(response) {
        if (response.status === 201) {

          APIService.communityCall('postsPost', [{
              topicId: vm.forum.topicId,
              forumId: vm.forum.id,
              type: 'question',
              text: vm.form.topic.question,
              ml: 'md'
            }])
            .then(postsPostAnswerResponse);

          function postsPostAnswerResponse(postresponse) {
            if (postresponse.status === 200) {
              AlertService.success('Topic ' + response.data.subject + ' skapad!');
              vm.forum.topics.push(response.data);
              resetAddTopicForm();

            } else {
              AlertService.error('Problem att skicka svar');
            }
          }

        } else {
          AlertService.error('Problem att skapa ny applikation');
        }
        vm.dataLoadingAddTopic = false;
      }
    }

    function resetAddTopicForm() {
      vm.form.topic = {};
      $scope.addTopicForm.$setPristine();
    }

  }

})();
