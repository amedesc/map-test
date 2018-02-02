
var earthquakes={};
var earthquake_points = [];
var earthquake_data = [];

var get_points = function(id){
	console.log(id);
	var earthquakes_array = earthquake_data.earthquakes;
	console.log(earthquakes_array);
	for(var i = 0; i< earthquakes_array.length; ++i){
		if(earthquakes_array[i].id==id){
			console.log(earthquakes_array[i].points_url);
			$.getJSON(earthquakes_array[i].points_url,function(result){
				console.log(result);
				removeMarkers();
				addMarkers(result.features);
			});
		}
	}
};
var retrive_earthquakes = function(){
	$.getJSON("https://raw.githubusercontent.com/fergo125/rsn-losentiste-web/master/data/earthquake_points.json?token=AHj5HkZkWgFPOGn4XDqVd_cmQRtW0q-yks5aeJd6wA%3D%3D",function(result){
		earthquake_data["earthquakes"] = result.map(function(earthquake){
		   var new_earthquake = earthquake;
		   new_earthquake["time_since"] = earthquake["timestamp"];
	       return new_earthquake;
		});
		console.log("render template");
		var compiled_list = Handlebars.templates['card'](earthquake_data);

		$("#cards-section").html(compiled_list);
		$(".card-container").click(function(event){
			$(".card-container").removeClass("selected")
			$(this).addClass("selected");
			console.log(event);
			get_points(event.currentTarget.id);
		});
	});

};

var main = function(){
	$('.modal').modal();
	$('.button-collapse').sideNav({
		menuWidth: 500, // Default is 300
		edge: 'left', // Choose the horizontal origin
		closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		draggable: true, // Choose whether you can drag to open on touch screens,
		onOpen: function(el) { /* Do Stuff */ }, // A function to be called when sideNav is opened
		onClose: function(el) { /* Do Stuff */ }, // A function to be called when sideNav is closed
	  }
	);
	retrive_earthquakes();
};



$(document).ready(
	main
);

