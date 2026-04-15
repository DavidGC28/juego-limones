 let canvas=document.getElementById("areaJuego")
 let ctx=canvas.getContext("2d")
 let personajeX = canvas.width / 2;
 let limonX=0;
 let limonY=0;

 

 function iniciarJuego(){
    dibujarSuelo()
    dibujarPersonaje() 
    dibujarLimones() 
 }

 const ALTURA_SUELO = 40;
 const ALTURA_PERSONAJE = 60; 
 const ANCHO_PERSONAJE = 60;
 const ANCHO_LIMON = 20;
 const ALTURA_LIMON = 20;


function dibujarSuelo() {
  const altoSuelo = ALTURA_SUELO; 
  const ySuelo = canvas.height - altoSuelo;
  const ancho = canvas.width;

 
  ctx.fillStyle = "#5d4037"; // Marrón oscuro
  ctx.fillRect(0, ySuelo, ancho, altoSuelo);


  ctx.fillStyle = "#78d62c"; 
  ctx.fillRect(0, ySuelo, ancho, 12); 

 
  ctx.fillStyle = "#a2e06d";
  ctx.fillRect(0, ySuelo, ancho, 4);

  
  for (let i = 0; i < ancho; i += 32) {
   
    ctx.fillStyle = "#49a620";
    ctx.fillRect(i + 8, ySuelo + 8, 4, 4);
    
    
    ctx.fillStyle = "#8d6e63";
    ctx.fillRect(i + 20, ySuelo + 24, 4, 4);
    
    ctx.fillStyle = "#d7ccc8";
    ctx.fillRect(i + 24, ySuelo + 24, 2, 2);
  }
}

function dibujarPersonaje() {
  const x = 400; 
  const y = canvas.height - 60;
    ctx.fillStyle = "#9c0909"; 
    ctx.fillRect(personajeX- 50,canvas.height -100, 60, 60);


}

function moverIzquierda() {
   personajeX = personajeX -20;
   actualizarPantalla();
}

function moverDerecha() {
   personajeX = personajeX +20;
   actualizarPantalla();
}
   

    function actualizarPantalla() {
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimones();
   
}

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarLimones() {
    ctx.fillStyle = "#ecd929";
    ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTURA_LIMON);
}

function bajarLimones() {
    limonY = limonY+100;
  
    actualizarPantalla();
}
                 

