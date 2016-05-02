  var locations = [{
      "title": "Idaho Central Credit Union - HQ",
      "lat": 42.914059,
      "lng": -112.462819,
      "streetAddress": "4400 Central Way",
      "website": "https://www.iccu.com/",
      },
      {
      "title": "DL Evans Bank",
      "lat": 42.907624,
      "lng": -112.465672,
      "streetAddress": "4080 Yellowstone Ave",
      "website": "https://www.dlevans.com/",
      },
      {
      "title": "Wells Fargo",
      "lat": 42.909370,
      "lng": -112.466802,
      "streetAddress": "4195 Yellowstone Ave",
      "website": "https://www.wellsfargo.com/",
      },
      {
      "title": "Idaho Central Credit Union - Chubbuck Branch",
      "lat": 42.915882,
      "lng": -112.466823,
      "streetAddress": "4537 Yellowstone Ave",
      "website": "https://www.iccu.com/",
      },
      {
      "title": "Mountain America Credit Union",
      "lat": 42.911453,
      "lng": -112.464667,
      "streetAddress": "152 Bullock St",
      "cityAddress": "Washington, DC 20500",
      "website": "https://www.macu.com",

      },
      {
      "title": "Idaho State University Credit Union",
      "lat": 42.9227200,
      "lng": -112.4658335,
      "streetAddress": "4914 Yellowstone Ave",
      "website": "https://www.isucu.org/",

      },
      {
      "title": "Advantage Plus Credit Union",
      "lat": 42.920881,
      "lng": -112.468284,
      "streetAddress": "150 W Chubbuck Rd",
      "website": "https://advantagepluscreditunion.com",

      },
      {
      "title": "Pocatello Railroad Federal Credit",
      "lat": 42.918957,
      "lng": -112.465726,
      "streetAddress": "4708 Yellowstone Ave",
      "website": "https://railswestcu.org"
      }];

var PlaceConstructor = function(dataObj){
  this.name = ko.observable(dataObj.title);
  this.lat = ko.observable(dataObj.lat);
  this.lng = ko.observable(dataObj.lng);
  // ...etc...
  // this includes all the things you want to track per location (whether it's a 'favorite' or not?)
}

var ViewModel = function(){
  var self = this;
  // for clarity of scope

  self.arrayOfAllMyLocations = ko.observableArray(locations);

  self.createMarkers = function makeMarker() {
      for(var i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
            position: {lat: locations[i].lat, lng: locations[i].lng},
            map: map,
            title: locations[i].title
          });
      google.maps.event.addListener(marker, "click", (function(marker, i) {
            return function() {
              contentString = "<h3>" + locations[i].title + "<h3>" + "<h4>" + locations[i].streetAddress + "</h4>" + "<a href=" + "\"" +locations[i].website + "\"" + "target=" + "\"" + "_blank" + "\"" + ">" + locations[i].website + "</a>";
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            }
        })(marker, i));
      }
    // make the markers, set event listeners, get infowindow content, etc
    // this may be pieced out into as many smaller functions as you think make sense
  }

  self.filterLocations = function() {
    // there are many ways to accomplish this, consider using
    // http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
    // and
    // ko.utils.arrayFilter()
    // http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  }

  // you will probably need to make additional functions to make this code modular and clean
  // or to add your unique functionality
}

  function initMap() {
    var mapOptions = {
      zoom: 15,
      center: {lat: 42.91255, lng: -112.466269},
      disableDefaultUI: true,
      zoomControl: true,
      panControl: true,
      scaleControl: true,
      streetViewControl: true,
      overviewMapControl: true,
    };
    map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
    var initialCenter = mapOptions.center;
    var initialZoom = mapOptions.zoom;

    makeMarker();
  }
  addButtons();
  appendList();
  google.maps.event.addDomListener(window, "load", initialize);

