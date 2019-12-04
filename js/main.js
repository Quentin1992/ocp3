//création de la carte
let myMap = L.map(mapId);


//création des objets carte, canvas et formulaire
const bikesMap = new Map(53.35, -6.26, 13);
const signCanvas = new Canvas("signCanvas");
const bookingForm = new Form();
const instructionsDiapos = new Diapos();
const diaposSlider = new Slider();


//informations pour le diaporama
let diapos = [
    {
        "explanation": "1 Je trouve la station la plus proche de chez moi",
        "image": "../images/Diapo/diapo1.png"
    },
    {
        "explanation": "2 Je clique sur le marqueur pour vérifier la disponibilité d'un vélo",
        "image": "../images/Diapo/diapo2.png"
    },
    {
        "explanation": "3 Je remplis le formulaire et je clique sur 'Réserver'",
        "image": "../images/Diapo/diapo3.png"
    },
    {
        "explanation": "4 Je signe et je clique à nouveau sur le bouton pour confirmer",
        "image": "../images/Diapo/diapo4.png"
    },
    {
        "explanation": "5 Je vais retirer mon vélo à la station sélectionnée, dans un délais de 20 minutes",
        "image": "../images/Diapo/diapo5.png"
    }
]


//affichage de la consigne
bookingForm.welcome();
//paramétrage et affichage de la carte
bikesMap.printMap();
//création et affichage des marqeurs
bikesMap.printMarkers();


//création des diapos
for (let i = 0; i < 5; i++) {

    //appel de création des conteneurs de diapos : je n'arrive pas à y insérer images et titres ensuite. donc création en html directement
    //instructionsDiapos.createDiapoContainer("slider", "diapo" + i);

    //on remplit les diapos
    instructionsDiapos.fillDiapoContainer("diapo" + i, diapos[i].image, diapos[i].explanation);

}


diaposSlider.initSlider();

let i = 0;
diaposSlider.setInterval();
