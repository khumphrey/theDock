app.config(function ($stateProvider) {
    $stateProvider.state('userManagement', {
        url: '/user-management',
        templateUrl: 'js/admin/user-management.html',
        controller: 'UserManagementCtrl',
        resolve: {
        	users: function(UserFactory) {
        		return UserFactory.fetchAll();
        	}
        }
    });
});

app.controller('UserManagementCtrl', function($scope, AuthService, UserFactory, users) {

	$scope.users = users;
	AuthService.getLoggedInUser()
		.then(function(currentUser) {
			$scope.currentUser = currentUser;
		});
	
	$scope.promoteUserToAdmin = function(user) {
		UserFactory.promoteToAdmin(user)
			.then(function(updatedUser) {
				// console.log("Updated user: ", user);
			})
			.then(null, function(err) {
				console.log(err);
			});
	};
		
	$scope.demoteAdminToUser = function(user) {
		UserFactory.demoteToUser(user)
			.then(function(updatedUser) {
				console.log("Updated user: ", user);
			})
			.then(null, function(err) {
				console.log(err);
			});
	};
	$scope.resetPassword = function(user) {
		console.log('Password reset for user ' + user.username);
		UserFactory.resetPassword(user);
	};
	$scope.deleteUser = function(user) {
		UserFactory.deleteOne(user)
			.then(function() {
				$scope.users.splice($scope.users.indexOf(user),1);
			})
			.then(null, function(err) {
				console.log(err);
			});	
	};
});