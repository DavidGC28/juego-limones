 let canvas=document.getElementById("areaJuego")
 let ctx=canvas.getContext("2d")

  const ALTURA_SUELO = 40;
 const ALTURA_PERSONAJE = 60; 
 const ANCHO_PERSONAJE = 60;
 const ANCHO_LIMON = 32;
 const ALTURA_LIMON = 24;

 let personajeX = canvas.width / 2;
 let personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
 let limonX = canvas.width / 2;
 let limonY= canvas.height /2;
 let puntaje = 0;
 let vida = 3;
 let intervaloLimones;
 let velocidadLimones = 100;


 

 function iniciarJuego(){
    clearInterval(intervaloLimones);
     intervaloLimones = setInterval(bajarLimones, velocidadLimones);
    dibujarSuelo()
    dibujarPersonaje() 
    dibujarLimones()
    dibujarArbusto() 
    aparecerLimones()
   
 }




function dibujarArbusto() {
  const altoArbusto  = 40; 
  const yArbusto = 0;
  const ancho = canvas.width;

 
  ctx.fillStyle = "#0a4915"; 
  ctx.fillRect(0, yArbusto, ancho, altoArbusto);


  ctx.fillStyle = "#78d62c"; 
  ctx.fillRect(0, yArbusto, ancho, 12); 

 
  ctx.fillStyle = "#a2e06d";
  ctx.fillRect(0, yArbusto, ancho, 4);

  
  for (let i = 0; i < ancho; i += 32) {
   
    ctx.fillStyle = "#49a620";
    ctx.fillRect(i + 8, yArbusto + 8, 4, 4);
    
    
    ctx.fillStyle = "#ddd26a";
    ctx.fillRect(i + 20, yArbusto + 24, 4, 4);
    
    ctx.fillStyle = "#ccc920";
    ctx.fillRect(i + 24, yArbusto + 24, 4, 4);
  }
}



function dibujarSuelo() {
  const altoSuelo = ALTURA_SUELO; 
  const ySuelo = canvas.height - altoSuelo;
  const ancho = canvas.width;

 
  ctx.fillStyle = "#5d4037"; 
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
  
    const x = personajeX; 
    const y = personajeY;
    const ancho = ANCHO_PERSONAJE;
    const alto = ALTURA_PERSONAJE;

  
    ctx.fillStyle = "#8d6e63"; // Color café madera
    ctx.fillRect(x, y, ancho, alto);

 
    ctx.fillStyle = "#5d4037"; 
    ctx.fillRect(x + (ancho * 0.3), y, 2, alto); 
    ctx.fillRect(x + (ancho * 0.7), y, 2, alto); 
  
    ctx.fillStyle = "#455a64"; 
    ctx.fillRect(x - 2, y + (alto * 0.2), ancho + 4, 6); 
    ctx.fillRect(x - 2, y + (alto * 0.7), ancho + 4, 6); 

    
    ctx.fillStyle = "#d7ccc8"; 
    ctx.fillRect(x + 4, y + 4, 4, 4); 
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
    dibujarArbusto();

   
}

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarLimones() {
    const x = limonX;
    const y = limonY;
    
    
    ctx.imageSmoothingEnabled = false;

  
    ctx.fillStyle = "#ecd929";
    // Dibujamos el centro del limón
    ctx.fillRect(x + 4, y + 4, 24, 16); 
   
    ctx.fillRect(x + 8, y, 16, 24); 
    ctx.fillRect(x, y + 8, 32, 8);

   
    ctx.fillStyle = "#cbb115";

    ctx.fillRect(x + 8, y + 20, 12, 4);
    ctx.fillRect(x + 24, y + 12, 4, 8);

   
    ctx.fillStyle = "#49a620"; 
    ctx.fillRect(x + 14, y - 4, 4, 6); 
    
    ctx.fillStyle = "#78d62c"; 
    ctx.fillRect(x + 18, y - 6, 8, 4);
}

function bajarLimones() {
 
    limonY = limonY + 10; 
    
    
    if (limonY > canvas.height - ALTURA_SUELO) {
        aparecerLimones();
        detectarPiso();
        
    }
    
    actualizarPantalla();
    detectarColision();
}

                 
function detectarColision() {
   
    if (limonX + ANCHO_LIMON > personajeX &&
        limonX < personajeX + ANCHO_PERSONAJE && 
        limonY + ALTURA_LIMON > personajeY &&
        limonY < personajeY + ALTURA_PERSONAJE) 
{
        puntaje = puntaje + 1;
        let componente = document.getElementById("txtPuntaje");
        if (componente) {
            componente.textContent = puntaje;
        }
        if (puntaje >= 10) {
            clearInterval(intervaloLimones);
            alert("¡Felicidades. Eres un gran agricultor!");
            reiniciarJuego();
            return;
        }

        if (puntaje % 3 === 0) {    
            velocidadLimones = velocidadLimones - 15;
            if (velocidadLimones < 20) velocidadLimones = 20;
            iniciarJuego();
        } 

        aparecerLimones(); 
            
    }
}
    
    

function aparecerLimones() {
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
    limonY = 50;
    actualizarPantalla();
}  

function detectarPiso() {
    vida = vida - 1; // Restamos solo 1
    let componenteVidas = document.getElementById("txtVidas");
    
    if (vida > 0) {
       
        if (componenteVidas) {
            if (vida === 2) componenteVidas.textContent = "♥♥";
            if (vida === 1) componenteVidas.textContent = "♥";
        }
    } else {
       
        if (componenteVidas) componenteVidas.textContent = "";
         alert("¡GAME OVER! Tu cosecha terminó.");
        clearInterval(juegoIntervalo); 
       
    }
}
function reiniciarJuego() {
    vidas = 3;
    puntaje = 0;
   
    document.getElementById("txtPuntaje").textContent = "0";
    document.getElementById("txtVidas").textContent = "♥♥♥";
  
    personajeX = canvas.width / 2;
    aparecerLimones(); 
}



