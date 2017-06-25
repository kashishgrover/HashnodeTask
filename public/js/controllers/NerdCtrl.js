angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

  var id = "";

  var PostFlag = true;
  $scope.LoggedIn = false;
  $scope.NewUser = false;

  $scope.syncingText = "Not Syncing..."

  $scope.Login = function() {
    var data = {
      email: $scope.email
    };

    $scope.syncingText = "Syncing..."

    $http.get('/api/comment', {
      params: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      console.log("GET successful.");
      PostFlag = false;
      $scope.LoggedIn = true;
      $scope.NewUser = false;
      $scope.syncingText = "Not Syncing..."
      $scope.comment = response.data.comment;
      id = response.data._id;
    });
  };

  $scope.Logout = function() {
    location.reload();
  };

  $scope.inputChanged = function() {
    $scope.syncingText = "Syncing...";

    var data = {
      email: $scope.email,
      comment: $scope.comment
    };

    if (PostFlag === true) {
      $http.post('/api/comment', data).success(function(data, status) {
        console.log("POST successful. Comment Synced.");
        PostFlag = false;

        $scope.syncingText = "Not Syncing...";
      });
    } else {
      console.log("Data will have to be PUT");
      $http.put('/api/comment/' + id, data).success(function(data, status) {
        console.log("PUT successful. Comment Synced.");

        $scope.syncingText = "Not Syncing...";
      });
    }

  };

});
