function initMap() {
  var myLatLng = {lat: 42.91255, lng: -112.466269};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });


	var locations = [
	     ['Idaho Central Credit Union - HQ',42.914059, -112.462819],
	     ['DL Evans Bank',42.907624, -112.465672],
	     ["Wells Fargo",42.909370, -112.466802],
	     ['Idaho Central Credit Union - Chubbuck Branch',42.915882, -112.466823],
	     ["Mountain America Credit Union",42.911453, -112.464667],
	     ["Maverik Adventure's First Stop",42.916559, -112.465783],
	     ["Shell Gas Station",42.914065, -112.465654],
	     ["Exxon Gas Station",42.910175, -112.465525],
	     ['Pine Ridge Mall',42.908967, -112.469435],
	     ["Carmike Cinemas",42.912032, -112.472239],
	     ["Ramada Inn",42.913985, -112.468230],
	     ["Tire Discounter",42.915888, -112.466036],
	     ["Jiffy Lube",42.918259, -112.465890],
	     ['Walmart Supercenter',42.909838, -112.463596],
	     ['Ross Dress for Less',42.907009, -112.458618],
	     ['T.J. Maxx',42.908488, -112.464857],
	     ["Ashley Furniture Home Store",42.909887, -112.458913],
	     ["Lowe's Home Improvement",42.911379, -112.459755],
	     ['The Home Depot',42.912023, -112.474539],
	     ["Dick's Sporting Goods",42.908221, -112.458785],
	     ["Ulta Beauty",42.909153, -112.464865],
	     ['Starbucks',42.911962, -112.465250],
	     ['Pizza Pie Cafe',42.907294, -112.462786],
	     ["Domino's Pizza", 42.916574, -112.466917],
	     ["MacKenzie River Pizza, Grill & Pub",42.908381, -112.462543],
	     ["Freddy's Frozen Custard & Steakburgers",42.912126, -112.463084],
	     ["McDonald's",42.911003, -112.465951],
	     ["Wendy's",42.915193, -112.466786],
	     ["Arby's",42.914726, -112.466641],
	     ["Burger King",42.915504, -112.465975],
	     ["Panda Express",42.910103, -112.466968],
	     ["Chapala Mexican Restaurant",42.913993, -112.466727],
	     ["Texas Roadhouse",42.911883, -112.462304],
	     ["Buffalo Wild Wings",42.908275, -112.461030],
	     ["Red Lobster",42.907880, -112.466797],
	     ["IHOP",42.908042, -112.465520],
	];
	(function app_markers() {
  	for (i=0; i < locations.length; i++) {
  		marker = new google.maps.Marker({
  			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
  			title: locations[i][0],
  			map: map,
  		})
  	}
  })();

  (function addElement () {
	var i;
  	for (i = 0; i < locations.length; i++) {
		var newLi = document.createElement("li");
		var text = document.createTextNode(locations[i][0]);

		newLi.appendChild(text);
		var ulnew = document.getElementsByTagName('ul')
		ulnew[0].appendChild(newLi)
	}
	})();

 	function toggleBounce() {
  	if (marker.getAnimation() !== null) {
    	marker.setAnimation(null);
  	} else {
    	marker.setAnimation(google.maps.Animation.BOUNCE);
  		}
	}
}