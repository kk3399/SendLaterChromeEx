myApp.service('EmailService',function($http, APP_CONSTANTS) {
    this.sendEmail = function(email, callback) {

        $.ajax
            ({
              type: "POST",
              url: APP_CONSTANTS.API_URL,
              dataType: 'json',
              async: false,
              data: {'from' : email.from, 'to': email.to, 'subject': email.subject, 
                'text': email.message, 'deliverytime': email.sendAt},
              success: function (){
                callback(true); 
              },
              error: function (){
                callback(false);
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


    // $scope.successTextAlert = "Some content";
    // $scope.showSuccessAlert = true;

    // $scope.failureTextAlert = "Some content";
    // $scope.showFailureAlert = true;

    $scope.resetForm = function (){
        $scope.email = []
        $scope.email.message = "";
        $scope.email.from = "";
        $scope.email.to = "";
        $scope.email.subject = ""; //$filter('date')(new Date(), 'medium');
        $scope.email.sendAt = $filter('date')(new Date(), 'medium');

        $scope.successTextAlert = "";
        $scope.showSuccessAlert = false;

        $scope.failureTextAlert = "";
        $scope.showFailureAlert = false;
    };

    $scope.resetForm();

    $scope.formClose = function(){
    };

    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };

    $scope.sendEmail = function(){
        if (!$scope.email.from || !$scope.email.to || !$scope.email.subject)
        {
            $scope.showFailureAlert = true;
            $scope.failureTextAlert = "Please fill in required fields";
            return;
        }


        var selectedDt = new Date();
        if ($scope.email.sendAt)
            selectedDt = new Date($scope.email.sendAt);
        var timeDiff = selectedDt.getTime() - (new Date()).getTime();
        if (timeDiff > 0 && (timeDiff/100 > 5))
            $scope.successTextAlert = "Email scheduled!";
        else
            $scope.successTextAlert = "Email sent!";

        var diffHours = Math.ceil(timeDiff / (1000 * 3600));
        if (diffHours < 0 || diffHours > 72) return; 
        $scope.email.sendAt = (selectedDt).toUTCString();
        EmailService.sendEmail($scope.email, function(status){
                if(status)
                {
                    $scope.resetForm();
                    $scope.showSuccessAlert = true;
                    $scope.showFailureAlert = false;
                }
                else
                {
                    $scope.showSuccessAlert = false;
                    $scope.showFailureAlert = true;
                    $scope.failureTextAlert = "Server error, couldn't send email!"

                }
            
        });
    };

    
});



