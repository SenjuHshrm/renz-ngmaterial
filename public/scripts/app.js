angular.module("portfolioPage",["ngMaterial","ngResource","ngAnimate","ui.router"])
  .controller('pageCtrl', function($scope){
    $scope.info = profile.info;
  })
  .controller('linkCtrl', function($scope){
    $scope.links = links;
  })
  .controller('languageCtrl', function($scope){
    $scope.languages = languages;
  })
  .controller('educCtrl', function($scope){
    $scope.educs = educs;
  })
  .controller('expCtrl', function($scope){
    $scope.exps = exp;
  })
  .controller('skillsCtrl', function($scope) {
    $scope.skills = skills;
  })
  .controller('githubCtrl', function($scope, $http, getGit, $sce) {
    $scope.getGitInfo = function() {
      $scope.loadedGithub = false;

      getGit.getData("https://api.github.com/users/SenjuHshrm").then(function(res) {
        if (res.data.name == "") res.data.name = res.data.login;

        $scope.gitHubUser = res.data;
        $scope.loadedGithub = true;
      }).catch(function(res) {
        console.log("catch", res);
      });

      getGit.getData("https://api.github.com/users/SenjuHshrm/repos").then(function(res){
        $scope.repos = res.data;
        $scope.reposFound = res.data.length > 0;
        $scope.maxLimit = res.data.length;
      }).catch(function(res){
        console.log("catch", res);
      });

      getGit.getData("https://api.github.com/repos/SenjuHshrm/renz-ngmaterial/commits").then(function(res) {
        $scope.commits = res.data;
        $scope.commitsFound = res.data.length > 0;
        $scope.limit = 5;
        $scope.maxLimit = res.data.length;
      }).catch(function(res) {
        console.log("catch", res);
      });

      getGit.getData("https://api.github.com/repos/SenjuHshrm/renz-ngmaterial/readme", true).then(function(res) {
        $scope.readme = $sce.trustAsHtml(res.data);
        getGit.getData("https://api.github.com/repos/SenjuHshrm/renz-ngmaterial/readme").then(function(res) {
          $scope.readmeInfo = res.data;
          console.log(res.data);
        }).catch(function(res) {
          console.log("catch", res);
        });
      }).catch(function(res) {
        console.log("catch", res);
      });
    }
  })
  .service('getGit', function($http) {
    return {
      getData: function(link, bool) {
        if (bool === true) {
          return $http.get(link, {
            headers: {
              "Accept": "application/vnd.github.v3.raw"
            }
          });
        } else {
          return $http.get(link);
        }
      }
    };
  })
