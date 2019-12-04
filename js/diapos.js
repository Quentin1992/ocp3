class Diapos {
    
    createDiapoContainer(sliderId, diapoId) {
        
        $("<div>", {
            css: {
                height: "300px",
                width: "800px",
                position: "relative",
                color: "white",
                backgroundColor: "black",
                overflow: "hidden"
            },
            "id": "#" + diapoId
        }).append($("#" + sliderId));

        
        
        console.log("#" + diapoId);
        
    };
    
    fillDiapoContainer(diapoId, imageUrl, explanation){
        
        $("<img>", {
            css: {
                position: "absolute"
            },
            src: imageUrl
        }).appendTo($("#" + diapoId));

        $("<h3>", {
            css: {
                position: "absolute",
            },
            html: explanation
        }).appendTo($("#" + diapoId));
        
    }
    
}
