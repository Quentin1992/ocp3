class Canvas {

    constructor(canvasId) {
        this.id = canvasId;
    }


    //fonction d'affichage du canvas
    //(prend en paramètre l'id qu'on veut lui donner)
    printCanvas() {

        //affichage d'une consigne indiquant qu'il faut signer
        let demandeConfirmation = $("<p>").html("Veuillez signer et confirmer votre réservation");
        $("#submitButton").before(demandeConfirmation);

        //affichage du canvas
        $("#submitButton").before($('<canvas>', {
            id: this.id
        }));

        $("#submitButton").before("<br />");

        //on change le nom du bouton d'envoi
        $("#submitButton")[0].value = "Confirmer";

        this.drawOnCanvas(this.id);

    };

    
    hideCanvas() {
        $("#submitButton")[0].value = "Réserver";
        $("canvas").detach();
    };
    
    
    //fonction de dessin sur le canvas
    drawOnCanvas() {

        let context = document.getElementById(this.id).getContext('2d');
        context.lineWidth = 2;
        context.beginPath();

        $("#" + this.id).on({

            mousedown: function (e) {

                $("#" + this.id).on("mousemove", function (e) {
                    context.lineTo(e.offsetX, e.offsetY);
                    context.stroke();
                })
            },

            mouseup: function () {

                $("#" + this.id).off("mousemove");
                context.beginPath();
            }

        });
    };
}