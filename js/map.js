
    // So we can talk about the map a bunch before I call it - made global.
    var map;
    var infowindow = new google.maps.InfoWindow;
    var marker,
      contentString;
    // Array for marker objects
  var locations = [
      {
      "title": "Idaho Central Credit Union - HQ",
      "lat": 42.914059,
      "lng": -112.462819,
      "streetAddress": "4400 Central Way",
      "website": "https://www.iccu.com/",
      "id": "nav0",
      "visible": ko.observable(true),
      "boolTest": true
      },
      {
      "title": "DL Evans Bank",
      "lat": 42.907624,
      "lng": -112.465672,
      "streetAddress": "4080 Yellowstone Ave",
      "website": "https://www.dlevans.com/",
      "id": "nav1",
      "visible": ko.observable(true),
      "boolTest": true
      },
      {
      "title": "Wells Fargo",
      "lat": 42.909370,
      "lng": -112.466802,
      "streetAddress": "4195 Yellowstone Ave",
      "website": "https://www.wellsfargo.com/",
      "id": "nav2",
      "visible": ko.observable(true),
      "boolTest": true
      },
      {
      "title": "Idaho Central Credit Union - Chubbuck Branch",
      "lat": 42.915882,
      "lng": -112.466823,
      "streetAddress": "4537 Yellowstone Ave",
      "website": "https://www.iccu.com/",
      "id": "nav2",
      "id": "nav3",
      "visible": ko.observable(true),
      "boolTest": true
      },
      {
      "title": "Mountain America Credit Union",
      "lat": 42.911453,
      "lng": -112.464667,
      "streetAddress": "152 Bullock St",
      "cityAddress": "Washington, DC 20500",
      "url": "www.whitehouse.gov",
      "website": "https://www.macu.com",
      "id": "nav4",
      "visible": ko.observable(true),
      "boolTest": true
      },
      {
      "title": "Idaho State University Credit Union",
      "lat": 42.9227200,
      "lng": -112.4658335,
      "streetAddress": "4914 Yellowstone Ave",
      "website": "https://www.isucu.org/",
      "id": "nav5",
      "visible": ko.observable(true),
      "boolTest": true
      },
      {
      "title": "Advantage Plus Credit Union",
      "lat": 42.920881,
      "lng": -112.468284,
      "streetAddress": "150 W Chubbuck Rd",
      "website": "https://advantagepluscreditunion.com",
      "id": "nav6",
      "visible": ko.observable(true),
      "boolTest": true
      },
      {
      "title": "Pocatello Railroad Federal Credit",
      "lat": 42.918957,
      "lng": -112.465726,
      "streetAddress": "4708 Yellowstone Ave",
      "website": "https://railswestcu.org",
      "id": "nav7",
      "visible": ko.observable(true),
      "boolTest": true
      }
    ];

    function makeMarker() {
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
  }

    function appendList() {
      for (var i = 0; i < locations.length; i++) {
        var newLi = document.createElement("li");
        var text = document.createTextNode(locations[i].title);

        newLi.appendChild(text);
        var ulnew = document.getElementsByTagName("ul");
        ulnew[0].appendChild(newLi);
      }

    };

  function addButtons() {
    document.getElementById('btnTerrain').addEventListener('click', function() {
      map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    });
    document.getElementById('btnSatellite').addEventListener('click', function() {
      map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    });
    document.getElementById('btnRoadmap').addEventListener('click', function() {
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    });
    document.getElementById('btnHybrid').addEventListener('click', function() {
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    })
  };

  function initialize() {
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