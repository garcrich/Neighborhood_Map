$(document).ready(function(){
	function viewModel() {
		var self = this;
		self.Locations = ko.observableArray([
		{
			title:  ko.observable("Idaho Central Credit Union - HQ"),
			lat: 42.914059,
			lng: -112.462819,
			streetAddress: "4400 Central Way",
			id: "loc0"
		},
		{
			title: "DL Evans Bank",
			lat: 42.907624,
			lng: -112.465672,
			streetAddress: "4080 Yellowstone Ave",
			id: "loc1"
		},
		{
			title: "Wells Fargo",
			lat: 42.909370,
			lng: -112.466802,
			streetAddress: "4195 Yellowstone Ave",
			id: "loc2"
		},
		{
			title: "Idaho Central Credit Union - Chubbuck Branch",
			lat: 42.909370,
			lng: -112.466802,
			streetAddress: "4195 Yellowstone Ave",
			id: "loc3"
		},
		{
			title: "Mountain America Credit Union",
			lat: 42.915882,
			lng: -112.466823,
			streetAddress: "4537 Yellowstone Ave",
			id: "loc4"
		}
	]);
	};
	ko.applyBindings(new viewModel());
});

