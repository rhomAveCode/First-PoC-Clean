/* App Controllers */

function SeasonListCtrl(Season, $location, $scope) {

    $scope.orderProp = 'LST_UPDT_DTTM';
    $scope.seasons = Season.query({});
    //$scope.seasons = Season.query({order:$scope.orderProp, name:$scope.query});
    var seasons = $scope.seasons;


    $scope.remove = function (season) {
        var ok = Season.delete({_id: season._id}, function (res) {
            console.log('indexOf: '+seasons.indexOf(season));
            if (res.ok === 1) {
                seasons.splice(seasons.indexOf(season), 1);
            } else {
                alert(JSON.stringify(res.ok));
            }
        })
    }

    $scope.add = function () {
        $location.path("/seasons/new");
    }

    $scope.sortBy = function(something){
        //season.CORP_ID = "100";
        console.log(something);
        $scope.orderProp = "season.CORP_ID";
    }

}
SeasonListCtrl.$inject = ['Season', '$location', '$scope'];

/*
function PhoneDetailCtrl(Phone, $routeParams, $scope) {
    $scope.phone = Phone.get({_id: $routeParams._id}, function(phone) {
        $scope.mainImageUrl = phone.details.images[0];
    });
    $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }
}
PhoneDetailCtrl.$inject = ['Phone', '$routeParams', '$scope'];
*/
function SeasonDetailCtrl(Season, $routeParams, $scope) {
    $scope.season = Season.get({_id: $routeParams._id}, function(season) {
        $scope.mainImageUrl = season.details.images[0];
    });
    $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }
}
SeasonDetailCtrl.$inject = ['Phone', '$routeParams', '$scope'];

function PhoneEditCtrl(Phone, $routeParams, $location, $scope) {
    $scope.phone = Phone.get({_id: $routeParams._id})
    
    $scope.save = function () {
        Phone.save({}, $scope.phone, function (res) {
            //if (res.ok === 1) {
                $location.path("/seasons");
            //}
        } )
    }
}
PhoneEditCtrl.$inject = ['Phone', '$routeParams', '$location', '$scope'];

function SeasonNewCtrl(Season, $routeParams, $scope, $location) {
    $scope.season = new Season();

    $scope.save = function () {
        Season.save({}, $scope.season, function (res) {
           // if (res.ok === 1) {
                $location.path("/seasons");
            //}
        })
    }

    $scope.cancel = function () {
        $location.path("/seasons");
    }
}
SeasonNewCtrl.$inject = ['Season', '$routeParams', '$scope', '$location'];

function PhoneAggreCtrl(Season, $routeParams, $scope) {
    $scope.count = Season.count();
    $scope.distinct = Season.distinct({}, {key:"carrier"});
    console.log($scope.distinct)
    $scope.group = Season.group({}, {
                            keys: {carrier:true },   cond: {}, 
                            initial: {sum: 0, count:0, max:0, avg:0}, 
                            reduce: "function(doc,out){out.sum += doc.age; out.count += 1; out.max = Math.max(out.max, doc.age); out.avg = out.sum/out.count;}"
                        })
    $scope.mapReduce = Season.mapReduce({},{
                            "map": "function(){emit(this.details.android.os, 1);}", 
                            "reduce": "function(key, values){return values.length;}"  
                        });
}
PhoneAggreCtrl.$inject = ['Season', '$routeParams', '$scope'];