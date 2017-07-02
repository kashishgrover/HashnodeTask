angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http, $window) {

  var dmp = new $window.diff_match_patch;

  var id = "";

  var PostFlag = true;
  $scope.LoggedIn = false;
  $scope.NewUser = false;

  $scope.syncingText = "Not Syncing..."

  var oldComment = "";
  var newComment = "";

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
        oldComment = response.data.comment;
        id = response.data._id;

        $scope.syncingText = "Not Syncing...";

        PostFlag = false;
        $scope.NewUser = false;
        $scope.LoggedIn = true;

      } else {
        console.log("GET successful, but no data found.");

        $scope.syncingText = "This user does not exist.";

        PostFlag = true;
        $scope.NewUser = true;

      }
    });
  };

  $scope.Logout = function() {
    location.reload();
  };

  $scope.inputChanged = function() {
    $scope.syncingText = "Syncing...";

    newComment = $scope.comment;

    //Send DIFF from over here to the Server
    console.log("Old Comment: ", oldComment);
    console.log("New Comment: ", newComment);

    $scope.left = oldComment;
    $scope.right = newComment;

    var diff_main = dmp.diff_main(oldComment, newComment);
    console.log("Difference: ", diff_main)

    if (PostFlag === true) {

      var data = {
        email: $scope.email,
        comment: $scope.comment
      };

      console.log("Data will be POSTed - ", data);
      $http.post('/api/comment/', data).success(function(data, status) {

        console.log("POST successful. Comment Synced. User Registered.");
        PostFlag = false;

        $scope.LoggedIn = true;
        $scope.syncingText = "Not Syncing...";

        id = data.ops[0]._id;
        oldComment = data.ops[0].comment;

      });
    } else {

      var data = {
        email: $scope.email,
        diff: diff_main
      };

      console.log("Data will have to be PUT - ", data);
      $http.put('/api/comment/' + id, data).success(function(status) {

        oldComment = newComment;
        console.log("PUT successful. Comment Synced.");

        $scope.syncingText = "Not Syncing...";

      });
    }
  };
});
