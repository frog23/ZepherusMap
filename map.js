var map;
var defaultMarker, thingsMarker, placesMarker, citationMarker, scienceMarker;

$(document).ready(function(){
	if ( $( "#map" ).length ) {	
		// create a map in the "map" div, set the view to a given place and zoom
		map = L.map('map').setView([35,15], 2);
		
		// add an OpenStreetMap tile layer
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		
		generateIcons();
		
		$.getJSON("data.json", function(json) {
			jQuery.each(json.data, function() {
					if(this.lat && this.long){
						var text = '<div class="bubble"><a href="https://www.youtube.com/watch?v='+this.id+'"><b>'+this.title+'</b></a><br /><br /><a href="https://www.youtube.com/watch?v='+this.id+'"><img src="https://img.youtube.com/vi/'+this.id+'/mqdefault.jpg" /></a>'+this.comment+'</div>';
						var marker = L.marker([this.lat, this.long],{icon:getIcon(this.category)}).bindPopup(text).openPopup().addTo(map);
					}
				});
		});
	}
});

function generateIcons(){
	defaultMarker = L.AwesomeMarkers.icon({
	    icon: 'asterisk',
	    markerColor: 'cadetblue',
	    prefix: 'fa'
	  });
	
	
	explainedMarker = L.AwesomeMarkers.icon({
	    icon: 'lightbulb-o',
	    markerColor: 'cadetblue',
	    prefix: 'fa'
	  });
	
	travelMarker = L.AwesomeMarkers.icon({
	    icon: 'compass',
	    markerColor: 'green',
	    prefix: 'fa'
	  });

	
	everythingMarker = L.AwesomeMarkers.icon({
	    icon: 'book',
	    markerColor: 'cadetblue',
	    prefix: 'fa'
	  });
	
	otherChannelMarker = L.AwesomeMarkers.icon({
	    icon: 'asterisk',
	    markerColor: 'orange',
	    prefix: 'fa'
	  });
}

function getIcon(category){
	if(category == "Explained"){
		return explainedMarker;
	}else if(category == "Travel"){
		return travelMarker;
	}else if(category == "Everything"){
		return everythingMarker;
	}else if(category == "OtherChannel"){
		return otherChannelMarker;
	}else{
		return defaultMarker;
	}
}