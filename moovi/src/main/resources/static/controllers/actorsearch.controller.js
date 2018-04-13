(function () {
    angular
        .module("MooviApp")
        .controller("ActorSearchController", ActorSearchController);

    function ActorSearchController($http, $scope) {
        var vm = this;
        var localpath = "http://localhost:8080/";
        var url = "/api/search/actor";
        vm.searchActorByName = searchActorByName;

        // $window.onload = function () {
        //     var nowPlayingUrl = "?nowPlaying=true";
        //     $scope.myVal = false;
        //     $http
        //         .get(url+nowPlayingUrl)
        //         .then(function (value) {
        //             $scope.nowplayingheading = "Now Playing Movies";
        //             $scope.movies = value.data;
        //         })
        // };

        $scope.$on('$viewContentLoaded', function()
        {
            $scope.myVal = false;
            $http
                .get(url)
                .then(function (value) {
                    $scope.mostPopularHeading = "Most Popular Actors";
                    $scope.actors = value.data;
                })

        });

        $scope.myKeyPress = function(keyEvent,name) {
            if (keyEvent.which === 13)
                searchActorByName(name);
        };

        function searchActorByName(name) {
            //var url = "https://api.themoviedb.org/3/search/movie?api_key=878a88feb1d8acab0c9883e805657264&query="+title;
            var findByName = "?actorName="+name;
            $scope.myVal = true;
            $http
                .get(url+findByName)
                .then(function (response) {
                    console.log(response);
                    $scope.actors = response.data;
                });
            console.log(name);
        }

    }
})();