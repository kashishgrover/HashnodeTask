angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

  $scope.tagline = 'This comment will be synced.';
  $scope.count = 0;

  var SyncThreshold = 10;

  $http.get('/api/comment').success(function(response) {
    console.log("I got the data I had requested.");
    console.log(response);
  });

  $scope.inputChanged = function() {
    $scope.count++;
    if ($scope.count % SyncThreshold === 0) {
      console.log($scope.comment);

      var data = {
        comment: $scope.comment
      };

      $http.post('/api/comment', data).success(function(data, status) {
        console.log('Data posted successfully');
      });

      console.log("Comment Will Be Synced.")
    }
  };

});
