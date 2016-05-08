var Location = function (title,latitude,longitude,streetAddress,website) {
    "use strict";
    var
        _title = ko.observable(title),
        _latitude = ko.observable(latitude),
        _longitude = ko.observable(longitude),
        _streetAddress = ko.observable(streetAddress),
        _website = ko.observable(website)
    ;

    return {
        title: _title,
        longitude: _longitude,
        latitude: _latitude,
        streetAddress: _streetAddress,
        website: _website
    };
};
