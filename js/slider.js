class Slider {

    //constructor init

    initSlider() {

        $(".diapo").hide();
        $("#diapo0").show();

        $(".diapoButton").css("background-color", "#000000");
        $("#d0Button").css("background-color", "#4D6A79");

    };


    nextSlide() {

        $("#diapo" + i).hide();
        i++;
        if (i === 5)
            i = 0;
        $("#diapo" + i).show();

        $(".diapoButton").css("background-color", "#000000");
        $("#d" + i + "Button").css("background-color", "#4D6A79");

    };

    previousSlide() {

        $("#diapo" + i).hide();
        $("#d" + i + "Button").css("background-color", "#000000");

        i--;
        if (i === -1)
            i = 4;
        $("#diapo" + i).show();

        $(".diapoButton").css("background-color", "#000000");
        $("#d" + i + "Button").css("background-color", "#4D6A79");

    }

    setInterval() {

        let nextSlideInterval = setInterval(this.nextSlide, 5000);

        $(document).keydown(function (touche) {

            clearInterval(nextSlideInterval);

            if (touche.which === 37)
                diaposSlider.previousSlide();

            if (touche.which === 39)
                diaposSlider.nextSlide();

            nextSlideInterval = setInterval(diaposSlider.nextSlide, 5000);

        });

        $("nav div").on("click", function (e) {

            clearInterval(nextSlideInterval);

            e.target.style.backgroundColor = "#4D6A79";

            let name = e.target.getAttribute("id");
            let num = Number(name.replace(/[^\d]/g, ""));
            i = num;

            $(".diapo").hide();
            $("#diapo" + i).show();

            $(".diapoButton").css("background-color", "#000000");
            $("#d" + i + "Button").css("background-color", "#4D6A79");

            nextSlideInterval = setInterval(diaposSlider.nextSlide, 5000);

        });

        let isPaused = false;
        $("#pauseSliderButton").on("click", function () {
            
            isPaused = !isPaused;
            
            if (isPaused){
                clearInterval(nextSlideInterval);
                console.log("c'est en pause");
            }
            else if (!isPaused){
                nextSlideInterval = setInterval(diaposSlider.nextSlide, 5000);
                console.log("ce n'est plus en pause");
            }
            //deux boutons : un apparaît et l'autre disparaît    
        });

    }

}
