var Location = function (title,latitude,longitude,streetAddress,website) {
    "use strict";
    var
        _title = ko.observable(title),
        _latitude = latitude,
        _longitude = longitude,
        _streetAddress = streetAddress,
        _website = website
    ;

    return {
        title: _title,
        longitude: _longitude,
        latitude: _latitude,
        streetAddress: _streetAddress,
        website: _website
    };
};
