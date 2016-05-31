var marker;
var infowindow;
var map;
store_urls = [],
    image = [],
    imageArray = [],
    self = this;

//Error handling for Google Maps
setTimeout(function() {
    var googleError = document.createElement("span");
    googleError.id = "map-error";
    googleError.innerHTML = "Unable to load google maps. Please check your internet connection and refresh your browser.";
    document.getElementById("mapDiv").appendChild(googleError);
}, 2250);

var showList = ko.observable(true);
toggleList = function() {
    showList(!self.showList());
}

//revealing module pattern for Locations
var Location = function(koTitle, title, latitude, longitude, streetAddress, website, setVisible) {
    "use strict";
    var
        _koTitle = ko.observable(koTitle),
        _title = title,
        _latitude = latitude,
        _longitude = longitude,
        _streetAddress = streetAddress,
        _website = website,
        _setVisible = ko.observable(setVisible);

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


var Coffee_shops = ko.observableArray([
    //var location = function (koTitle, title,latitude,longitude,streetAddress,website)
    new Location("Salt Lake Roasting Co", "Salt Lake Roasting Co", 40.7603327, -111.8817539, "320 E 400 S", "http://www.roasting.com/"),
    new Location("Blue Copper Coffee Room", "Blue Copper Coffee Room", 40.7497675, -111.8999455, "179 W 900 S", "http://bluecopperslc.com/"),
    new Location("Publik Coffee Roasters", "Publik Coffee Roasters", 40.747846, -111.893512, "975 S W Temple", "https://www.publikcoffee.com/"),
    new Location("Alchemy Coffee", "Alchemy Coffee", 40.733139, -111.879873, "390 E 1700 S", "http://www.alchemycoffee.com/"),
    new Location("Nostalgia", "Nostalgia", 40.766796, -111.883631, " 248 E 100 S", "http://nostalgiacoffee.com/"),
    new Location("Millcreek Coffee Roasters", "Millcreek Coffee Roasters", 40.754951, -111.890677, "657 Main St", "http://www.millcreekcoffee.com/"),
    new Location("The Rose Establishment", "The Rose Establishment", 40.764005, -111.902221, "235 400 W", "http://www.theroseestb.com/")
]);

//constructor to retrieve flickr urls by latitude and longitude
function Coffee_pics(lat, lon) {
    this.url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1e96d71e506797151f901590a412d700&tags=street&lat=" + lat + "&lon=" + lon + "&format=json&nojsoncallback=1"
};

//retrieve flickr urls by lattitude and longitude
for (var i = 0; i < Coffee_shops().length; i++) {
    var store_url = new Coffee_pics(Coffee_shops()[i].latitude, Coffee_shops()[i].longitude);
    store_urls.push(store_url.url);
}

Request1 = new XMLHttpRequest();
//send request to flickrAPI
Request1.onreadystatechange = flickrAPI1;
Request1.open("GET", store_urls[0]);
Request1.send();

Request2 = new XMLHttpRequest();
//send request to flickrAPI
Request2.onreadystatechange = flickrAPI;
Request2.open("GET", store_urls[1]);
Request2.send();

Request3 = new XMLHttpRequest();
//send request to flickrAPI
Request3.onreadystatechange = flickrAPI;
Request3.open("GET", store_urls[2]);
Request3.send();

Request4 = new XMLHttpRequest();
//send request to flickrAPI
Request4.onreadystatechange = flickrAPI;
Request4.open("GET", store_urls[3]);
Request4.send();

Request5 = new XMLHttpRequest();
//send request to flickrAPI
Request5.onreadystatechange = flickrAPI;
Request5.open("GET", store_urls[4]);
Request5.send();

Request6 = new XMLHttpRequest();
//send request to flickrAPI
Request6.onreadystatechange = flickrAPI;
Request6.open("GET", store_urls[5]);
Request6.send();

Request7 = new XMLHttpRequest();
//send request to flickrAPI
Request7.onreadystatechange = flickrAPI;
Request7.open("GET", store_urls[6]);
Request7.send();

//AJAX function grabs information and parses it and provides a url
//flickrAPI1 includes else if to check connection. Less DRY but will only show alert box once vs. 7 times.
function flickrAPI1() {
    if (this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(this.responseText);
        var photos = json.photos.photo;
        var urls = photos.map(function(photo) {
            return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
        });
        updateImages(urls);
    } else if (this.readyState === 4 && this.status !== 200) {
        setTimeout(function() {
            alert("local image is currently unavailable. Please check your internet connection");
        }, 3500);
    }
}

function flickrAPI() {
    if (this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(this.responseText);
        var photos = json.photos.photo;
        var urls = photos.map(function(photo) {
            return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
        });
        updateImages(urls);
        console.log("called json" + json);
    }
}


//Once flickr API is successful store image links within image then push each image into image Array array
function updateImages(images) {
    imageArray.push(images); //store callback value (image) in array
}

console.log(store_urls);

//ko filter
var viewModel = function() {

    var searchTerm = ko.observable("");

    var filteredCoffee_shops = ko.computed(function() {
        var filter = searchTerm().toLowerCase();
        if (!filter) {
            makeMarkers(Coffee_shops());
            return Coffee_shops();
        }
        //filter data
        var filtered = ko.utils.arrayFilter(Coffee_shops(), function(item) {
            var fields = ["koTitle"];
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
        makeMarkers(filtered);
        infowindow.close();
        return filtered;
    });
    return {
        searchTerm: searchTerm,
        Coffee_shops: filteredCoffee_shops,
    };
};

ko.applyBindings(viewModel);

function configureTimeout(parameter) {
    setTimeout(function() {
        parameter;
    }, 700);
}

function infoWin(data) {
    for (var i = 0; i < Coffee_shops_allMarkers.length; i++) {
        if (data.title === Coffee_shops_allMarkers[i].title) {
            var listContentString = "<h2>" + Coffee_shops_allMarkers[i].title + "</h2>" + "<h3>" + Coffee_shops_streets[i] + "</h3>" + "<img class='photo' src='" + imageArray[i][i] + "'>" +
                "<h4>" + "website:" + "</h4>" + "<a href=" + "\"" + Coffee_shops_website[i] + "\"" + "target=" + "\"" + "_blank" + "\"" + ">" + Coffee_shops_website[i] + "</a>";
            infowindow.setContent(listContentString);
            infowindow.open(map, Coffee_shops_allMarkers[i]);
            Coffee_shops_allMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
            (function(i) {
                setTimeout(function() {
                    Coffee_shops_allMarkers[i].setAnimation(null);
                }, 700);
            })(i);
        }
    }
}

//add properties to Coffee_shops array
//empty array for google markers
Coffee_shops.allMarkers = [];
Coffee_shops.streets = [];
Coffee_shops.website = [];
var Coffee_shops_allMarkers = Coffee_shops.allMarkers;
var Coffee_shops_streets = Coffee_shops.streets;
var Coffee_shops_website = Coffee_shops.website;

//map markers
function makeMarkers(filtered) {
    //remove selected markers from map
    if (Coffee_shops_allMarkers) {
        Coffee_shops_allMarkers.forEach(function(marker) {
            marker.setVisible(false);
        });
        Coffee_shops_streets = [];
        Coffee_shops_allMarkers = [];
        Coffee_shops_website = [];
        if (!filtered) {
            filtered = Coffee_shops();
        }

        //console.log('Coffee_shops().length :'+ filtered.length);

        //append markers from filtered array
        for (var i = 0; i < filtered.length; i++) {
            marker = new google.maps.Marker({
                position: {
                    lat: filtered[i].latitude,
                    lng: filtered[i].longitude
                },
                map: map,
                infoWindow: null,
                animation: null,
                title: filtered[i].title,
            });
            Coffee_shops_allMarkers.push(marker); //push markers because Google Maps does not support this feature
            Coffee_shops_streets.push(filtered[i].streetAddress);
            Coffee_shops_website.push(filtered[i].website);

            //when marker is clicked info window with Coffee_shops information will appear and animation
            // will be set to Bounce for marker
            google.maps.event.addListener(Coffee_shops_allMarkers[i], "click", (function(Coffee_shops_allMarkers, i) {
                return function() {
                    //content for info window
                    var contentString = "<h2>" + filtered[i].title + "</h2>" + "<h3>" + filtered[i].streetAddress + "</h3>" + "<img class='photo' src='" + imageArray[i][i] + "'>" +
                        "<h4>" + "website:" + "</h4>" + "<a href=" + "\"" + filtered[i].website + "\"" + "target=" + "\"" + "_blank" + "\"" + ">" + filtered[i].website + "</a>";
                    //set info window information
                    infowindow.setContent(contentString);
                    infowindow.open(map, Coffee_shops_allMarkers[i]);

                    if (Coffee_shops_allMarkers[i].getAnimation() !== null) {
                        Coffee_shops_allMarkers[i].setAnimation(null);
                        infowindow.close(map, Coffee_shops_allMarkers[i]);
                    } else {
                        Coffee_shops_allMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
                        setTimeout(function() {
                            Coffee_shops_allMarkers[i].setAnimation(null);
                        }, 700);
                    }
                };
            })(Coffee_shops_allMarkers, i));
        }
    }
}
//initialize google Map
function initMap() {
    infowindow = new google.maps.InfoWindow();
    //map coordinates and options
    var mapOptions = {
        zoom: 14,
        center: {
            lat: 40.75193,
            lng: -111.888198
        },
        disableDefaultUI: true,
        zoomControl: true,
        panControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true
    };
    //append map to web page
    map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
    makeMarkers();
}