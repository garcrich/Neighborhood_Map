
self = this;
var Coffee_shops = ko.observableArray([
    //var location = function (koTitle, title,latitude,longitude,streetAddress,website a.k.a facebook page)
    new Location("Salt Lake Roasting Co", "Salt Lake Roasting Co", 40.7603327, -111.8817539, "320 E 400 S", "http://www.roasting.com/"),
    new Location("Blue Copper Coffee Room", "Blue Copper Coffee Room", 40.7497675, -111.8999455, "179 W 900 S", "http://bluecopperslc.com/"),
    new Location("Publik Coffee Roasters", "Publik Coffee Roasters", 40.747846,-111.893512, "975 S W Temple", "https://www.publikcoffee.com/"),
    new Location("Alchemy Coffee", "Alchemy Coffee", 40.733139,-111.879873, "390 E 1700 S", "http://www.alchemycoffee.com/"),
    new Location("Nostalgia", "Nostalgia", 40.766796,-111.883631,  " 248 E 100 S", "http://nostalgiacoffee.com/"),
    new Location("Millcreek Coffee Roasters", "Millcreek Coffee Roasters", 40.754951,-111.890677, "657 Main St", "http://www.millcreekcoffee.com/"),
    new Location("The Rose Establishment", "The Rose Establishment",  40.764005,-111.902221, "235 400 W", "http://www.theroseestb.com/")
]);


/*for (var i = 0; i < Coffee_shops().length; i++) {
	//use closure to make function object like
    (function(i) {
        $.ajax({
            method: 'get',
            url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2b6b4dc0dbfb5c802d4622c883c7d556&text=" + Coffee_shops()[i].title + "&format=json&nojsoncallback=1",
            dataType: "json",
            success: function(result) {
                var source = result.photos.photo[0];
                var caption = result.photos.photo[0].title;
                var photo_url = 'https://farm' + source.farm + '.staticflickr.com/' + source.server +
                    '/' + source.id + '_' + source.secret + '_q.jpg';
				    $("body").append("<img class='flickr_test' src='" + photo_url + "'>").append("<figcaption>" + caption + "</figcaption>");
            }
        });
    })(i);
}*/

var flickr_img = [];
$.ajax({
            method: 'get',
            url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2b6b4dc0dbfb5c802d4622c883c7d556&text=" + Coffee_shops()[0].title + "&format=json&nojsoncallback=1",
            dataType: "json",
            async: false,
            success: function(result) {
                $(result.photos.photo).each(function(index,value) {
                    // console.log(value.title);
                    var photo_url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server +
                    '/' + value.id + '_' + value.secret + '_q.jpg';
                    //$("body").append("<img class='flickr_test' src='" + photo_url + "'>").append("<figcaption>" + value.title + "</figcaption>");
                    flickr_img.push(photo_url);
                });

            }
        });

flickr_img.forEach(function(entry) {
    $("body").append("<img class='flickr_test' src='" + entry + "'>");
})

