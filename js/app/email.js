myApp.service('EmailService',function($http) {
    this.sendEmail = function(email, callback) {
        $http({
        url: 'https://api.mailgun.net/v2/sandboxa4e6b947eb7b47568c17482c8618e9d5.mailgun.org/messages',
        method: 'POST',
        data: {'from' : email.from, 'to': email.to, 'subject': email.subject, 
                'text': email.message, 'o:deliverytime': email.sendAt},
        headers: {'Content-Type': 'application/json', 'Authorization': 'Basic ' + API_KEY}
            }).success(function (data, status, headers, config) {
                        console.log("SUCCESS");
                        console.log(data);
                        //handle success
                        //$location.path('/'); //maybe you want to do this  
            }).error(function (data, status, headers, config) {
                        //handle error
            });
    };

});

myApp.controller("EmailController", function ($scope, EmailService, $filter) {


    $scope.resetForm = function (){
        $scope.email = []
        $scope.email.message = "sample subject";
        $scope.email.from = "krishna.carsearch@gmail.com";
        $scope.email.to = "damarla.kk@gmail.com";
        $scope.email.subject = $filter('date')(new Date(), 'medium');
        $scope.email.sendAt = $filter('date')(new Date(), 'medium');
    };

    $scope.resetForm();

    $scope.formClose = function(){
    };

    $scope.sendEmail = function(){
        EmailService.sendEmail($scope.email, function(){
            console.alert("Sent??");
        });
    };

    
});



