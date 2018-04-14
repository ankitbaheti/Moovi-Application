(function () {
    angular
        .module("MooviApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($http,$scope) {
        var vm = this;
        var localpath = "http://localhost:8080/";
        var url = "/api/review";
        var movieId = localStorage.getItem("movieId");
        var username = localStorage.getItem("username");
        $scope.mName = name;
        vm.writeReview = writeReview;

        function writeReview(field,reviewVal) {
            var reviewForMovie = {
                "rating":field,
                "review":reviewVal
            };
            $http
                .post(localpath+url,reviewForMovie)
                .then(function (response) {
                    window.location.href = localpath+"#!/searchMovie";

                    alert("Review Posted");

                    vm.linkCriticToReview = linkCriticToReview;

                    function linkCriticToReview() {
                        $scope.reviewResponse = angular.fromJson(response.data);

                        var criticLinkingURL = localpath+"api/reviews/review/"+$scope.reviewResponse.reviewId+"/critic/"+username;

                        $http
                            .post(criticLinkingURL)
                            .then(function(response) {
                                $scope.review = response;
                                alert("Review assigned to this Critic!");

                            });
                    }

                    linkCriticToReview();

                    vm.linkMovieReview = linkMovieReview;

                    function linkMovieReview() {
                        $scope.reviewResponse = angular.fromJson(response.data);
                        console.log(movieId);
                        var movieLinkingURL = localpath+"api/reviews/review/"+$scope.reviewResponse.reviewId+"/movie/"+movieId;

                        $http
                            .post(movieLinkingURL)
                            .then(function(response) {
                                $scope.review = response;
                                alert("Review assigned to this Movie!");

                            });
                    }

                    linkMovieReview();
                });
        }

    }
})();