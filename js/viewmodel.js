var vm = (function () {
    "use strict";

    var banks = ko.observableArray([
        //var location = function (title,latitude,longitude,streetAddress,website)
        new Location("Idaho Central Credit Union - HQ", 42.914059, -112.462819, "4400 Central Way", "https://www.iccu.com/"),
        new Location("DL Evans Bank", 42.907624, -112.465672, "4080 Yellowstone Ave", "https://www.dlevans.com/"),
        new Location("Wells Fargo", 42.909370, -112.466802, "4195 Yellowstone Ave", "https://www.wellsfargo.com/"),
        new Location("Idaho Central Credit Union - Chubbuck Branch", 42.915882, -112.466823, "4537 Yellowstone Ave", "https://www.iccu.com/"),
        new Location("Mountain America Credit Union", 42.911453, -112.464667,  "152 Bullock St", "https://www.macu.com"),
        new Location("Idaho State University Credit Union", 42.9227200, -112.4658335, "4914 Yellowstone Ave", "https://www.isucu.org/"),
        new Location("Advantage Plus Credit Union", 42.920881, -112.468284, "150 W Chubbuck Rd", "https://advantagepluscreditunion.com"),
        new Location("Pocatello Railroad Federal Credit", 42.918957, -112.465726, "4708 Yellowstone Ave", "https://railswestcu.org")
    ]);

    var searchTerm = ko.observable("");

    var filteredBanks = ko.computed(function () {
        //if catalog is empty return empty array
        if (!banks()) {
            return [];
        }
        var filter = searchTerm().toLowerCase();
        //if filter is empty return all the catalog
        if (!filter) {
            return banks();
        }
        //filter data
        var filtered = ko.utils.arrayFilter(banks(), function (item) {
            var fields = ["title"]; //we can filter several properties
            var i = fields.length;
            while (i--) {
                var prop = fields[i];
                var strProp = ko.unwrap(item[prop]).toLowerCase();
                if (strProp.indexOf(filter) !== -1) {
                    return true;
                }
            }
            return false;
        });
        return filtered;
    });

    return {
        searchTerm: searchTerm,
        banks: filteredBanks,
    };
})();

ko.applyBindings(vm);