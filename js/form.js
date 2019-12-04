class Form {

    welcome() {
        
        $("#infos").html("");
        
        $("<p>", {css: {
            color: "#333333"
        }}).html("Cliquez sur un emplacement de station de vélo pour en obtenir les informations.").appendTo("#infos");
        
    }
    
    
    printForm() {

        //création du formulaire
        let form = $("<form>").appendTo(infos);

        //ajout des inputs dans le formulaire
        $('<input>', {
            type: "text",
            name: "lastname"
        }).appendTo(form);
        $("<br />").appendTo(form);
        $('<input>', {
            type: "text",
            name: "firstname"
        }).appendTo(form);
        $("<br />").appendTo(form);
        $('<input>', {
            type: "submit",
            id: "submitButton",
            value: "Réserver"
        }).appendTo(form);

        //à l'envoi du formulaire, on enregistre le nom et le prénom
        //et on affiche la zone de signature
        form.on("submit", function (e) {

            e.preventDefault();

            //stockage des nom et prénom pour l'autocomplétion du formulaire
            localStorage.setItem('lastname', e.target.lastname.value);
            localStorage.setItem('firstname', e.target.firstname.value);

            //affichage de la zone de signaure
            signCanvas.printCanvas();

            //on remplace la fonction liée à l'envoi du formulaire
            //(qui contient maintenant la signature)
            form.off("submit");
            form.on("submit", function (e) {

                e.preventDefault();

                // création et enregistrement de la réervation
                let booking = {
                    "lastname": localStorage.getItem('lastname'),
                    "firstname": localStorage.getItem('firstname'),
                    "bookingAddress": sessionStorage.getItem('bookingAddress')
                };
                sessionStorage.setItem("booking", JSON.stringify(booking));
                
                //on supprime l'enregistrement séparé de l'adresse
                sessionStorage.removeItem("bookingAddress");

                //affichage de la réservation
                bookingForm.printBooking();
                
                //on réinitialise le formulaire
                bookingForm.welcome();

            });
        });
    };


    //fonction d'affichage d'une réservation
    printBooking() {

        console.log("et je fais quoi avec cette signature ?");

        //récupération de l'objet booking
        let booking = JSON.parse(sessionStorage.getItem("booking"));

        $("#confirmation").html("");

        //création du paragraphe avec adresse de station, prénom et nom d'utilisateur et emplacement du décompte
        $("#confirmation").html("Vélo réservé à la station " +
            booking.bookingAddress +
            " par " +
            booking.firstname +
            " " +
            booking.lastname +
            "<br />Temps restant : ");

        //mise en place du décompte à l'emplacement souhaité
        this.setCountdown(20, "#confirmation");
    };


    //fonction de création de compte à rebours
    //(prends en paramètre une durée en minutes et un endroit par sélecteur css)
    setCountdown(time, place) {

        //variables de temps
        let minutes = time - 1; //on enlève une minute car ajoute ensuite 60 secondes
        let seconds = 60;

        let chrono = $("<span>").html(time + "min 00s").appendTo($(place));

        // on crée un interval d'une seconde
        let countdown = setInterval(function () {

            //une seconde en moins, logique...
            seconds--;

            //passage au décompte d'une nouvelle minute
            if (seconds < 0) {
                minutes--;
                seconds = 59;
            }

            //on arrête quand ça arrive à 0
            if (seconds === 0 && minutes === 0)
                clearInterval(countdown);

            let minutesSeconds = minutes + "min " + seconds + "s";

            chrono.html("");
            chrono.html(minutesSeconds);

        }, 1000);

    };

    
    //fonction d'affichage des infos d'une station
    printInfos(address, stands, bikes) {

        $("#infos").html("");
        let infos = $("#infos");

        $("<p>").html("Adresse : " + address).appendTo(infos);
        $("<p>").html(stands + " places").appendTo(infos);
        $("<p>").html(bikes + " vélos disponibles").appendTo(infos);

        //stockage de l'adresse pour l'affichage de la réservation
        //(utilisé par printBooking)
        sessionStorage.setItem("bookingAddress", address);
    };


    //fonction de remplissage automatique du formulaire
    fillForm() {

        if (localStorage.getItem("lastname") !== undefined)
            $("form")[0].lastname.value = localStorage.getItem("lastname");

        if (localStorage.getItem("firstname") !== undefined)
            $("form")[0].firstname.value = localStorage.getItem("firstname");

    };

}