angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

  $scope.tagline = 'This comment will be synced.';
  $scope.count = 0;
  var id = "";

  var PostFlag = true;

  var SyncThreshold = 10;

  $scope.Login = function() {
    console.log($scope.email);

    var data = {
      email: $scope.email
    };

    $http.get('/api/comment', {
      params: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      console.log("I got the data I had requested.");
      PostFlag = false;
      $scope.comment = response.data.comment;
      id = response.data._id;
    });
  };

  $scope.inputChanged = function() {
    $scope.count++;
    if ($scope.count % SyncThreshold === 0) {

      var data = {
        email: $scope.email,
        comment: $scope.comment
      };
      if (PostFlag === true) {
        $http.post('/api/comment', data).success(function(data, status) {
          console.log('Data posted successfully');
          console.log("Comment Synced.");
          PostFlag = false;
        });
      } else {
        console.log("Data will have to be PUT");
        $http.put('/api/comment/' + id, data);
      }
    }
  };

});
