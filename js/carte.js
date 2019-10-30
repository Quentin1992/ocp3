//création du modèle de pointeur
var bikeIcon = L.icon({
    iconUrl: '../images/BicycleMarkerSymbol.png',
    shadowUrl: '',

    iconSize: [31.5, 49.6], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [15.75, 49.6], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//fonction de création de la carte
const setMap = function (latitude, longitude, zoom) {
    mymap.setView([latitude, longitude], zoom);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicXVlbnRpbmJvZ2FlcnQiLCJhIjoiY2sxa2Q5aTVnMDVpbDNibzNkdndwNzE2NCJ9.XmuAKo4iO0rlhpnG2-7yRA'
    }).addTo(mymap);
};

//fonction d'affichage des infos d'une station
const printInfos = function (address, stands, bikes) {
    $("#indication").hide();
    $("#reservation").show();
    $("#reservation").width("49%");
    //$("#reservation").display = true;
    $("#address").text(address);
    $("#stands").text(stands);
    $("#bikes").text(bikes);

};

//fonction de création d'un pointeur de station
const createMarker = function (map, latitude, longitude, address, stands, bikes) {
    //ajout du marqueur sur l'emplacement de la station
    var marker = L.marker([latitude, longitude], {
        icon: bikeIcon
    }).addTo(map);

    //affichage des infos au clic sur un pointeur de station
    marker.on("click", function () {
        printInfos(address, stands, bikes);
    });
};

//création de la carte
let mymap = L.map('mapid');
//paramétrage de la carte
setMap(53.35, -6.26, 13);

//requête pour récupérer la liste des stations à Dublin
ajaxGet("https://api.jcdecaux.com/vls/v3/stations?contract=dublin&apiKey=38e2352bd8ec2a84f42cd99f14a1713c94ce2b6b", function (reponse) {
    //données transformées en tableau
    let stations = JSON.parse(reponse);

    //création d'un pointeur sur chaque emplacement de station
    for (i = 0; i < stations.length; i++) {
        createMarker(mymap, stations[i].position.latitude, stations[i].position.longitude, stations[i].address, stations[i].totalStands.availabilities.stands, stations[i].totalStands.availabilities.bikes);
    }
});


$("form").submit(function (e) {
    e.preventDefault();
    console.log(e.target.lastname.value);
    //afficher la réservation
});


const tracerTrait = function(dessinable){
    var context = document.getElementById("canvas").getContext('2d');
    context.lineWidth = 2;
    context.beginPath();
    console.log(context);
    context.on("mousedown", function(e) {
        context.lineTo(e.offsetX, e.offsetY);
        console.log(e.offsetX + " " + e.offsetY);
        context.stroke();
    });
    context.on("mouseup", function(){
        console.log("youpi fin du trait");
    });
};

$(canvas).on("mousedown", function (e) {
    tracerTrait($(canvas));
    console.log(e.target);
});




/*var marker = L.marker([50.63, 3.06]).addTo(mymap);*/

/*var circle = L.circle([stations[0].position.latitude, stations[0].position.longitude], {
	color: 'pink',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 900
}).addTo(mymap);

var polygon = L.polygon([
	[50.63, 3.06],
	[50.63, 3.07],
	[50.64, 3.08]
]).addTo(mymap);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
	.setLatLng([50.64, 3.08])
	.setContent("I am a standalone popup.")
	.openOn(mymap);

function onMapClick(e) {
    popup
	.setLatLng([50.64, 3.08])
	.setContent("You clicked the map at " + e.latlng)
	.openOn(mymap);
}

mymap.on('click', onMapClick);*/
