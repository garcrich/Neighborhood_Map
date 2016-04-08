var map;
function initMap() {
  var mapOptions = {
    zoom: 16,
    center: {lat: 42.91255, lng: -112.466269},
    mapTypeId: google.maps.MapTypeId.HYBRID,
    disableDefaultUI: true
  };


   map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var contentString = "<h3>" +   +"</h3>";
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

   for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      position: {lat: locations[i].lat, lng: locations[i].lng},
      map: map,
      title: locations[i].title
   });
    var info = new marker.addListener("click", function () {
      new google.maps.InfoWindow({content: "<h3>" +locations[i] + "</h3>"});.open(map, marker);
    });
  }
}




  //Information about the different locations
  //Provides information for the markers
var locations = [
    {
    "title": "Idaho Central Credit Union - HQ",
    "lat": 42.914059,
    "lng": -112.462819,
    "streetAddress": "4400 Central Way",
    "id": "nav0",
    "visible": ko.observable(true),
    "boolTest": true
    },
    {
    "title": "DL Evans Bank",
    "lat": 42.907624,
    "lng": -112.465672,
    "streetAddress": "4080 Yellowstone Ave",
    "id": "nav1",
    "visible": ko.observable(true),
    "boolTest": true
    },
    {
    "title": "Wells Fargo",
    "lat": 42.909370,
    "lng": -112.466802,
    "streetAddress": "4537 Yellowstone Ave",
    "id": "nav2",
    "visible": ko.observable(true),
    "boolTest": true
    },
    {
    "title": "Idaho Central Credit Union - Chubbuck Branch",
    "lat": 42.915882,
    "lng": -112.466823,
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
    "id": "nav4",
    "visible": ko.observable(true),
    "boolTest": true
    },
    {
    "title": "Idaho State University Credit Union",
    "lat": 42.9227200,
    "lng": -112.4658335,
    "streetAddress": "4914 Yellowstone Ave",
    "id": "nav4",
    "visible": ko.observable(true),
    "boolTest": true
    }
  ];

