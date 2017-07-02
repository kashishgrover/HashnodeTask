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

      if (response.data !== null) {
        console.log("GET successful. Data found.");
        $scope.comment = response.data.comment;
        id = response.data._id;
        $scope.syncingText = "Not Syncing...";
        $scope.NewUser = false;
        $scope.LoggedIn = true;
        PostFlag = false;

      } else {
        console.log("GET successful, but no data found.");
        PostFlag = true;
        $scope.syncingText = "This user does not exist.";
        $scope.NewUser = true;

      }
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

        console.log("POST successful. Comment Synced. User Registered.");
        PostFlag = false;

        $scope.LoggedIn = true;
        $scope.syncingText = "Not Syncing...";
        id = data.ops[0]._id;

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
