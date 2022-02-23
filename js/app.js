var app = {
    styles: [
        'plain',
        'empty',
        'light',
        'highlight',
    ],
    init: function(){

        app.generateForm();
        app.generateColorPicker();
    },
    generateForm:  function(){

        var form = document.querySelector('.configuration');

        var gridSize = document.createElement('input');
        gridSize.type = "number";
        gridSize.className = 'input';
        gridSize.placeholder = "Taille de la grille"
        gridSize.value = 15;


        var pixelSize = document.createElement('input');
        pixelSize.type = "number";
        pixelSize.className = 'input input--not-rounded';
        pixelSize.placeholder = "Taille des Pixels"
        pixelSize.value = 15;

        // Créer  un bouton 
        var submit = document.createElement('button');
        submit.type = "submit";
        submit.className = "button";
        submit.textContent = "Go";


        form.appendChild(gridSize);
        form.appendChild(pixelSize);
        form.appendChild(submit);

        //Lorsqu'on soumet le formulaire 

        form.addEventListener('submit', app.handleFormSubmit);
    },
    generateColorPicker: function(){

        var colorPicker = document.createElement('div');
        colorPicker.id="color-picker";

        // Je crée autant de sous boites que de styles dans mon tableau
        for (var i = 0; i < app.styles.length; i++) {
            var color = document.createElement('div');
            color.className = "color " + app.styles[i];
            color.addEventListener('click', app.handleColorClick);
            colorPicker.appendChild(color);
        }


        document.body.appendChild(colorPicker);
    },
    handleColorClick: function(evt){
        console.log('clic');
        var classes = evt.target.className; 
        var classesArray = classes.split(' '); 
        var choosenStyle = classesArray[1]; // light
        app.choosenStyle = choosenStyle; // Je le stocke dans app pour qu'il soit accessible ailleurs
    },
    handleFormSubmit: function(evt){
        // J'empêche le comportement par défaut

        evt.preventDefault();
 
        var domElement = evt.target;

  
        var inputs = domElement.querySelectorAll('input');
        console.log(inputs);
        // inputs contient un NodeList (comme un array)
        // avec les 2 inputs
        var gridSizeNumber = parseInt(inputs[0].value, 10);
        var pixelSizeNumber = parseInt(inputs[1].value, 10);
        app.generateGrid(gridSizeNumber, pixelSizeNumber);
    },
    generateGrid: function(gridSizeNumber, pixelSizeNumber){

        // Je récupère la div avec #invader
        var invaderZone = document.getElementById('invader');

        invaderZone.innerHTML = '';

        for(var i = 0; i < gridSizeNumber; i++){

            var ligne = document.createElement('div');

            ligne.className = "row";
            // Je veux répéter 8 fois les instructions 
            // pour créer un pixel
            for(var j=0; j < gridSizeNumber; j++){
                // Je veux créer un pixel
                var pixel = document.createElement('div');
                pixel.className = "pixel";
                // Je place un eventListener pour réagir au clic
                pixel.addEventListener('click', app.handlePixelClick);

                pixel.style.width = pixelSizeNumber + "px";
                pixel.style.height = pixelSizeNumber + "px";
                // Je met le pixel dans la ligne
                ligne.appendChild(pixel);
            }
            // Je mettre cette balise dans le DOM
            invaderZone.appendChild(ligne);
        }

    },
    handlePixelClick: function(evt){

        console.log("clic", evt.target);

        evt.target.classList = "pixel " + app.choosenStyle;

        // Exemple avec des styles
        // if(evt.target.style.backgroundColor === 'black'){
        //     evt.target.style.backgroundColor = 'white'
        // } else {
        //     evt.target.style.backgroundColor = 'black'
        // }
        

    },
};


app.init();