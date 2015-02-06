myApp.service('EmailService',function($http, APP_CONSTANTS, Base64) {
    this.sendEmail = function(email, callback) {

        $.ajax
            ({
              type: "POST",
              url: "http://localhost:3000/email",
              dataType: 'json',
              async: false,
              data: {'from' : email.from, 'to': email.to, 'subject': email.subject, 
                'text': email.message, 'deliverytime': email.sendAt},
              success: function (){
                console.log('Thanks'); 
              }
            });
        

        // $http.defaults.useXDomain = true;
        // $http.defaults.headers.common = {"Access-Control-Allow-Origin": "*"}; 
        // $http.defaults.headers.common = {"Access-Control-Request-Headers": "Content-Type, X-Requested-With"};
        // $http.defaults.headers.common = {"Access-Control-Allow-Methods": "GET, PUT, POST"}; 
        
        
        // $http({
        // url: APP_CONSTANTS.API_URL,
        // method: 'POST',
        // data: {'from' : email.from, 'to': email.to, 'subject': email.subject, 
        //         'text': email.message, 'o:deliverytime': email.sendAt},
        // headers:{'Content-Type':'application/json'}
        //     }).success(function (data, status, headers, config) {
        //                 console.log("SUCCESS");
        //                 console.log(data);
        //                 //$location.path('/'); 
        //     }).error(function (data, status, headers, config) {
        //                 //handle error
        //                 console.log("error");
        //     });
         
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
        $scope.email.sendAt = (new Date($scope.email.sendAt)).toUTCString();
        EmailService.sendEmail($scope.email, function(){
            console.alert("Sent??");
        });
    };

    
});



