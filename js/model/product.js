//revealing module pattern
var Location = function (koTitle,title,latitude,longitude,streetAddress,website,setVisible) {
    "use strict";
    var
        _koTitle = ko.observable(koTitle),
        _title = title,
        _latitude = latitude,
        _longitude = longitude,
        _streetAddress = streetAddress,
        _website = website,
        _setVisible = ko.observable(setVisible);
    ;

    return {
        koTitle: _koTitle,
        title: title,
        longitude: _longitude,
        latitude: _latitude,
        streetAddress: _streetAddress,
        website: _website,
        setVisible: _setVisible
    };
};
