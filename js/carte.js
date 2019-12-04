class Map {

    constructor(latitude, longitude, zoom) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
    }

    //fonction d'affichage de la carte
    printMap() {

        myMap.setView([this.latitude, this.longitude], this.zoom);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoicXVlbnRpbmJvZ2FlcnQiLCJhIjoiY2sxa2Q5aTVnMDVpbDNibzNkdndwNzE2NCJ9.XmuAKo4iO0rlhpnG2-7yRA'
        }).addTo(myMap);
        
        //affichage du titre de la carte
        $("<div>", {
            position: "absolute"
        }).html("Carte des stations").appendTo($("#mapId"));

    }

    //création et affichage des marqueurs
    printMarkers() {

        //création du modèle de marqueur
        var bikeIcon = L.icon({
            iconUrl: '../images/BicycleMarkerSymbol.png',
            shadowUrl: '',

            iconSize: [31.5, 49.6], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [15.75, 49.6], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62], // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });


        //on va chercher les infos des stations de la ville
        ajaxGet("https://api.jcdecaux.com/vls/v3/stations?contract=dublin&apiKey=38e2352bd8ec2a84f42cd99f14a1713c94ce2b6b", function (reponse) {

            //données transformées en tableau
            let stations = JSON.parse(reponse);

            //création d'un pointeur sur chaque emplacement de station
            for (let i = 0; i < stations.length; i++) {

                //ajout du marqueur sur l'emplacement de la station
                var marker = L.marker([stations[i].position.latitude, stations[i].position.longitude], {
                    icon: bikeIcon
                }).addTo(myMap);

                //au clic sur un marqueur, affichage des infos
                marker.on("click", function () {

                    //nouvelle requête pour avoir les infos à jour
                    ajaxGet("https://api.jcdecaux.com/vls/v3/stations?contract=dublin&apiKey=38e2352bd8ec2a84f42cd99f14a1713c94ce2b6b", function (reponse) {

                        //données transformées en tableau
                        let stations = JSON.parse(reponse);

                        //stockage des infos nécessaires dans des variables pour les passer dans la fonction d'affichage
                        let address = stations[i].address;
                        let stands = stations[i].totalStands.availabilities.stands;
                        let bikes = stations[i].totalStands.availabilities.bikes;

                        //si l'adresse correspond à la réservation précédente, on indique qu'il y a un vélo en moins et une place en plus
                        if (sessionStorage.getItem("booking") !== null)
                            if (JSON.parse(sessionStorage.getItem("booking")).bookingAddress === address) {
                            bikes--;
                        }

                        //affichage des infos de la station
                        bookingForm.printInfos(address, stands, bikes);

                        //si au moins 1 vélo disponible, affichage du formulaire
                        if (bikes > 0) {
                            bookingForm.printForm();
                            //remplissage du formulaire si données disponibles
                            bookingForm.fillForm();
                        } else $("<p>").html("Réservation impossible, aucun vélo disponible à cette station.").appendTo(infos);

                    });
                });
            }

        });
        
    }
}
