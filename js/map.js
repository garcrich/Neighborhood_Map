var map;
var infowindow = new google.maps.InfoWindow;
var marker;

//revealing module pattern
var banks = ko.observableArray([
    //var location = function (koTitle, title,latitude,longitude,streetAddress,website a.k.a facebook page)
    new Location("CoHo Coffee", "CoHo Coffee", 42.8598574,  -112.4373139, "904 S 4th Ave", "https://www.facebook.com/Co.Ho.TheSmartBar/?fref=ts"),
    new Location("College Market Coffeehouse", "College Market Coffeehouse", 42.864709, -112.4357415, "604 S 8th Ave", "https://www.facebook.com/The-College-Market-156572444544283/?fref=ts"),
    new Location("Starbucks", "Starbucks", 42.8624186, -112.4430602, "330 E Benton St", "https://www.facebook.com/Starbucks-134135709964883/?fref=ts"),
    new Location("Cafe Tuscano", "Cafe Tuscano", 42.8768060,-112.4214400, "2231 E Center St", "https://www.facebook.com/cafetuscanoinpocatello/?fref=ts"),
    new Location("Rocky Mountain Ministries", "Rocky Mountain Ministries", 42.8890690,-112.4369930,  "845 Hyde Ave", "https://www.facebook.com/RockyMountainMin/?fref=ts"),
    new Location("Double Shot Coffee Roasters & Donuts", "Double Shot Coffee Roasters & Donuts", 42.8873730,-112.4495730, "215 E Cedar St", "https://www.facebook.com/Double-Shot-Coffee-Roasters-Donuts-Hut-on-Jefferson-1046677665403362/?fref=nf"),
    new Location("Java Express", "Java Express", 42.8871620,-112.4530680, "675 Yellowstone Ave", "https://www.facebook.com/pages/Java-Express/977154642305992")
]);

//display or hide list
function toggleList() {
  var listDisplay = document.getElementById("search");
  listDisplay.style.display = (listDisplay.style.display != "none" ? "none" : "" );
  var hideList_Message = document.getElementById("hideList");
  hideList_Message.innerHTML = (hideList_Message.innerHTML != "Hide List" ? "Hide List" : "Show List");
};

document.getElementById("hideList").addEventListener("click", toggleList);

//var filtBanks = ko.observableArray([]);

var viewModel = function vmInit() {
    "use strict";

    var searchTerm = ko.observable("");

    var filteredBanks = ko.computed(function () {
        var filter = searchTerm().toLowerCase();
        if (!filter) {
          makeMarkers(banks());
            return banks();
        } else {

        }
        //filter data
        var filtered = ko.utils.arrayFilter(banks(), function (item) {
            var fields = ["koTitle"]; //we can filter several properties if needed
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
        return filtered;
    });


    return {
        searchTerm: searchTerm,
        banks: filteredBanks,
    };
};

ko.applyBindings(viewModel);
  banks.allMarkers = [];
  var banks_allMarkers = banks.allMarkers;
//map markers
function makeMarkers(filtered) {
  if (banks_allMarkers) {
    banks_allMarkers.forEach(function(marker){
    marker.setVisible(false)
  })

  banks_allMarkers = [];
  if (!filtered) {
    filtered = banks();
  }
  console.log('banks().length :'+ filtered.length);
  for(var i = 0; i < filtered.length; i++) {
    marker = new google.maps.Marker({
    position: {lat: filtered[i].latitude(), lng: filtered[i].longitude()},
    map: map,
    title: filtered[i].title,
  });

  banks_allMarkers.push(marker); //push markers because Google Maps does not support this feature

  google.maps.event.addListener(banks_allMarkers[i], "click", (function(banks_allMarkers, i) {
    return function() {
      contentString = "<h3>" + filtered[i].title + "</h3>" + "<h3>" + filtered[i].streetAddress + "</h3>" + "<h4>" + "facebook:" + "</h4>" + "<a href=" + "\"" +filtered[i].website + "\"" + "target=" + "\"" + "_blank" + "\"" + ">" + filtered[i].website + "</a>";
      infowindow.setContent(contentString);
      infowindow.open(map, banks_allMarkers[i]);

      if (banks_allMarkers[i].getAnimation() !== null) {
       banks_allMarkers[i].setAnimation(null);
       infowindow.close(map, banks_allMarkers[i]);
      } else  {
        banks_allMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
      }

      }
    })(banks_allMarkers, i));
  };
  }

};

  function initMap() {

    var mapOptions = {
      zoom: 14,
      center: {lat: 42.8768475, lng: -112.4507077},
      disableDefaultUI: true,
      zoomControl: true,
      panControl: true,
      scaleControl: true,
      streetViewControl: true,
      overviewMapControl: true
    };
    map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
    var initialCenter = mapOptions.center;
    var initialZoom = mapOptions.zoom;

    makeMarkers();

  }
  google.maps.event.addDomListener(window, "load", initMap);