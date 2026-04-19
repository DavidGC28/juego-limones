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
 let velocidadLimones = 200;

 

 function iniciarJuego(){
    setInterval(bajarLimones,200)
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
    // Usamos las variables que ya tienes definidas
    const x = personajeX; 
    const y = personajeY;
    const ancho = ANCHO_PERSONAJE;
    const alto = ALTURA_PERSONAJE;

    // 1. CUERPO DEL BARRIL (Madera base)
    ctx.fillStyle = "#8d6e63"; // Color café madera
    ctx.fillRect(x, y, ancho, alto);

    // 2. LÍNEAS DE LAS TABLAS (Efecto madera)
    // Dibujamos líneas verticales oscuras para separar las tablas
    ctx.fillStyle = "#5d4037"; 
    ctx.fillRect(x + (ancho * 0.3), y, 2, alto); // Línea izquierda
    ctx.fillRect(x + (ancho * 0.7), y, 2, alto); // Línea derecha

    // 3. CINCHOS DE METAL (Aros)
    // Estos son los que le dan la forma clásica de barril
    ctx.fillStyle = "#455a64"; // Color gris metálico
    ctx.fillRect(x - 2, y + (alto * 0.2), ancho + 4, 6); // Aro superior
    ctx.fillRect(x - 2, y + (alto * 0.7), ancho + 4, 6); // Aro inferior

    // 4. DETALLES DE BRILLO (Opcional, para el estilo Pixel Art)
    ctx.fillStyle = "#d7ccc8"; 
    ctx.fillRect(x + 4, y + 4, 4, 4); // Un pequeño punto de luz arriba
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
    
    // Desactivamos el suavizado para que los bordes se vean "cuadrados"
    ctx.imageSmoothingEnabled = false;

    // 1. CUERPO PRINCIPAL (Amarillo Brillante)
    ctx.fillStyle = "#ecd929";
    // Dibujamos el centro del limón
    ctx.fillRect(x + 4, y + 4, 24, 16); 
    // Dibujamos las puntas para darle forma ovalada
    ctx.fillRect(x + 8, y, 16, 24); 
    ctx.fillRect(x, y + 8, 32, 8);

    // 2. SOMBRA (Para dar volumen)
    ctx.fillStyle = "#cbb115";
    // Una franja en la parte inferior y derecha
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
        detectarPiso();
        aparecerLimones();
    }
    
    actualizarPantalla();
    detectarColision();
}

                 
function detectarColision() {
    // Usamos las constantes actualizadas para que coincidan con el dibujo
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
        aparecerLimones(); // Primero sumamos punto, luego reiniciamos posición
    }
} 
    
        
    
    

function aparecerLimones() {
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
    limonY = 50;
    actualizarPantalla();
}  

function detectarPiso() {
    vida = vida - 1;
    let componenteVidas = document.getElementById("txtVidas");
    
    if (componenteVidas) {
        if (vida === 2) componenteVidas.textContent = "♥♥";
        else if (vida === 1) componenteVidas.textContent = "♥";
        else if (vida <= 0) {
            componenteVidas.textContent = "";
            alert("¡GAME OVER! Tu cosecha terminó.");
            reiniciarJuego(); 
        }
    }
}

function reiniciarJuego() {
    vidas = 3;
    puntaje = 0;
    // Actualizamos el HTML
    document.getElementById("txtPuntaje").textContent = "0";
    document.getElementById("txtVidas").textContent = "♥♥♥";
    // Reset posiciones
    personajeX = canvas.width / 2;
    aparecerLimones(); 
}