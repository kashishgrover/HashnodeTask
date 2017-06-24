angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

  var id = "";

  var PostFlag = true;
  $scope.LoggedIn = false;
  $scope.NewUser = false;

  $scope.syncing = "Not Syncing..."

  $scope.Login = function() {
    var data = {
      email: $scope.email
    };

    $http.get('/api/comment', {
      params: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      console.log(response);
      console.log("I got the data I had requested.");
      PostFlag = false;
      $scope.LoggedIn = true;
      $scope.NewUser = false;
      $scope.comment = response.data.comment;
      id = response.data._id;
    });
  };

  $scope.Logout = function() {
    location.reload();
  };

  $scope.inputChanged = function() {
    $scope.syncing = "Syncing...";
    var data = {
      email: $scope.email,
      comment: $scope.comment
    };
    if (PostFlag === true) {
      $http.post('/api/comment', data).success(function(data, status) {
        console.log('Data posted successfully');
        console.log("Comment Synced.");
        PostFlag = false;
        $scope.syncing = "Not Syncing...";
      });
    } else {
      console.log("Data will have to be PUT");
      $http.put('/api/comment/' + id, data).success(function(data, status) {
        console.log('Data put successfully');
        console.log("Comment Synced.");
        $scope.syncing = "Not Syncing...";
      });
    }
  };

});
