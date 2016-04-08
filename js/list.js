	// Array values = [title, lat, lng, streetAddress, id, visible, boolTest]
	var locations = [
		 //Banking
	     ["Idaho Central Credit Union - HQ",42.914059, -112.462819, "4400 Central Way", "loc0","",""],
	     ["DL Evans Bank",42.907624, -112.465672, "4080 Yellowstone Ave", "loc1","",""],
	     ["Wells Fargo",42.909370, -112.466802, "4195 Yellowstone Ave","loc2","",""],
	     ["Idaho Central Credit Union - Chubbuck Branch",42.915882, -112.466823, "4537 Yellowstone Ave","loc3","",""],
	     ["Mountain America Credit Union",42.911453, -112.464667, "152 Bullock St","loc4","",""],
	     //Gas Stations
	     ["Maverik Adventure's First Stop",42.916559, -112.465783, "4564 Yellowstone Ave","loc5","",""],
	     ["Shell Gas Station",42.914065, -112.465654, "5059 Yellowstone Ave","loc6","",""],
	     ["Exxon Gas Station",42.910175, -112.465525, "4230 Yellowstone Ave","loc7","",""],
	     //Entertainment
	     ["Pine Ridge Mall",42.908967, -112.469435, "4155 Yellowstone Highway","loc8","",""],
	     ["Carmike Cinemas",42.912032, -112.472239, "4355 Yellowstone Ave","loc9","",""],
	     ["Ramada Inn",42.913985, -112.468230, "loc10","","",""],
	     //Auto
	     ["Tire Discounter",42.915888, -112.466036, "4534 Yellowstone Ave","loc11","",""],
	     ["Jiffy Lube",42.918259, -112.465890, "4674 Yellowstone Ave","loc12","",""],
	     //Shopping
	     ["Walmart Supercenter",42.909838, -112.463596, "4240 Yellowstone Ave","loc13","",""],
	     ["Ross Dress for Less",42.907009, -112.458618, "1746 Hurley Dr","loc14","",""],
	     ["T.J. Maxx",42.908488, -112.464857, "4150 Yellowstone Ave","loc14","",""],
	     ["Ashley Furniture Home Store",42.909887, -112.458913, "1950 Hurley Dr","loc15","",""],
	     ["Lowe's Home Improvement",42.911379, -112.459755, "650 Bullock St","loc16","",""],
	     ["The Home Depot",42.912023, -112.474539, "4340 Hawthorne Rd","loc17","",""],
	     ["Dick's Sporting Goods",42.908221, -112.458785, "1844 Hurley Dr","loc18","",""],
	     ["Ulta Beauty",42.909153, -112.464865, "4150 Yellowstone Ave","loc19","",""],
	     //Fook and Drink
	     ["Starbucks",42.911962, -112.465250, "150 Bullock St #1","loc20","",""],
	     ["Pizza Pie Cafe",42.907294, -112.462786, "4141 Pole Line Rd","loc21","",""],
	     ["Domino's Pizza", 42.916574, -112.466917, "110 Knudsen Blvd, Ste C","loc22","",""],
	     ["MacKenzie River Pizza, Grill & Pub",42.908381, -112.462543, "4150 Pole Line Rd","lco23","",""],
	     ["Freddy's Frozen Custard & Steakburgers",42.912126, -112.463084, "210 Bullock St","loc24","",""],
	     ["McDonald's",42.911003, -112.465951, "4260 Yellowstone Ave","loc25","",""],
	     ["Wendy's",42.915193, -112.466786, "4519 Yellowstone Ave","loc26","",""],
	     ["Arby's",42.914726, -112.466641, " 4501 Yellowstone Ave","loc27","",""],
	     ["Burger King",42.915504, -112.465975, "4508 North Yellowstone","loc28","",""],
	     ["Panda Express",42.910103, -112.466968, "4225 Yellowstone Ave","loc29","",""],
	     ["Chapala Mexican Restaurant",42.913993, -112.466727, "117 W Burnside Ave","loc30","",""],
	     ["Texas Roadhouse",42.911883, -112.462304, "560 Bullock St","loc31","",""],
	     ["Buffalo Wild Wings",42.908275, -112.461030, "4200 Pole Line Rd","loc32","",""],
	     ["Red Lobster",42.907880, -112.466797, " 4105 N Yellowstone Hwy","loc33","",""],
	     ["IHOP",42.908042, -112.465520, "4122 Yellowstone Ave","loc34","",""],
	];

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
