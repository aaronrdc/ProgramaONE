//declaracion de variables
let palabras=['pantalla','programacion','software','robots','celular','perifericos','computo'];
let errores=0;
let aciertos=0;
//let usadas=document.querySelector(".usadas");
var palabra=[];
var guiones;
let keyName;
var yaUsadas=[];
var erradas=[];


//activa el replace en funcion Leer Teclado
String.prototype.replaceAt = function(index, character) {
    const arr = this.split('');
    arr[index]=character;
    return arr.join('');
}

//declaracion de botones
var btnIniciar= document.querySelector("#iniciarJuego");
btnIniciar.onclick=IniciarJuego;

var btnvolverInicio= document.querySelector("#volverInicio");
btnvolverInicio.onclick=volverInicio;

var btnAgregarPalabra= document.querySelector("#agregarPalabra");
btnAgregarPalabra.onclick=agregarPalabra;

var btnJuegoNuevo= document.querySelector("#juegoNuevo");
btnJuegoNuevo.onclick=juegoNuevo;

//oculta elementos en pg ppal
document.getElementById("volverInicio").style.display = "none"
document.getElementById("juegoNuevo").style.display = "none"
document.getElementById("canvas").style.display= "none";

//activa Canvas
var pantalla = document.getElementById("canvas");
var pincel = pantalla.getContext("2d");


//funciones
function reset(){
    document.getElementById("letrasErradas").innerHTML=[];
    document.getElementById("usadas").innerHTML=[];
    errores=0;
}

function IniciarJuego(){
    reset();
    document.getElementById("iniciarJuego").style.display = "none";
    document.getElementById("agregarPalabra").style.display = "none";
    document.getElementById("volverInicio").style.display= "inline";
    document.getElementById("juegoNuevo").style.display= "inline";
    document.getElementById("canvas").style.display= "inline";
    document.getElementById("guiones").style.display= "inline";
    canvas();
    dibujarEstructura();
    elegirPalabra();
    leerTeclado();
    reset();
    
    
}

function agregarPalabra(){
    document.getElementById("iniciarJuego").style.display = "none";
    document.getElementById("agregarPalabra").style.display = "none";
    document.getElementById("juegoNuevo").style.display= "none";
    document.getElementById("volverInicio").style.display= "inline";
    document.getElementById("canvas").style.display= "none";
    document.getElementById("guiones").style.display= "none";
    
}

function juegoNuevo(){
    errores=0;
    reset();
    document.getElementById("iniciarJuego").style.display = "none";
    document.getElementById("agregarPalabra").style.display = "none";
    document.getElementById("volverInicio").style.display= "inline";
    document.getElementById("juegoNuevo").style.display= "inline";
    pincel.clearRect(0, 0, canvas.width, canvas.height); //pendiente investigar 
    canvas();
    dibujarEstructura();
    elegirPalabra();
    
}

function volverInicio(){
    reset();
    document.getElementById("iniciarJuego").style.display = "inline";
    document.getElementById("agregarPalabra").style.display = "inline";
    document.getElementById("volverInicio").style.display= "none";
    document.getElementById("juegoNuevo").style.display= "none";
    document.getElementById("canvas").style.display= "none";
    document.getElementById("guiones").style.display= "none";
}

function canvas(){
    pincel.fillStyle = "#f5f5f5";
    pincel.fillRect(0, 0, 265, 250);
        
}

function dibujarLinea(x1, y1, x2, y2,color) {
    pincel.lineWidth=10;
    pincel.beginPath();
    pincel.moveTo(x1,y1)
    pincel.lineTo(x2,y2);
    pincel.strokeStyle=color
    pincel.stroke();
    
}

function dibujarEstructura(){
    dibujarLinea(65,200,135,200,"black");
    dibujarLinea(100,50,100,200,"black");
    dibujarLinea(95,50,185,50,"black");
    dibujarLinea(180,50,180,90,"black");
    
}

function elegirPalabra(){
    palabra = palabras[Math.floor(Math.random()*palabras.length)].toUpperCase();
    guiones= palabra.replace(/./g,"_");
    palabra.split('');
    //document.getElementById("texto").innerHTML=palabra; //SIEMPRE OCULTA
    document.getElementById("guiones").innerHTML=guiones;
    //alert(palabra);
    console.log(palabra.split(''));
    console.log(palabra.length)
        
   
}


function leerTeclado(){
    
    document.addEventListener("keydown", e=> {
        keyName=e.keyCode=== 32 ? "Space":e.key;
        var encontrada=0;
        var repetida=0;
        for(j=0; j<yaUsadas.length;j++){
            if(keyName.toUpperCase()==yaUsadas[j]){
                repetida++;
                //console.log("repetida"+repetida)
            }
        }
        if(repetida===0){
             yaUsadas=document.getElementById("usadas").innerHTML+=keyName.toUpperCase();
            //alert(yaUsadas);

        }

        if(e.keyCode>=64 && e.keyCode<=90){
            for( i=0; i<palabra.length; i++){
                
                if(e.key.toUpperCase()===palabra[i] ){
                    guiones=guiones.replaceAt(i,keyName);
                    document.getElementById("guiones").innerHTML=guiones.toUpperCase();
                    encontrada++

                    if(guiones.indexOf('_')==-1){
                        alert("Felicidades, ganaste");
                        setTimeout(juegoNuevo,3500);
                    }
                    
                }
                    
            }
            if (encontrada==0 && repetida==00){
                erradas=document.getElementById("letrasErradas").innerHTML+=keyName.toUpperCase();
                errores++;
                dibujo(draws[errores]);
                if(errores==6){
                    
                    alert("AHORCADO por "+ errores + " errores.");
                    alert("la palabra era: "+ palabra);
                    
                    setTimeout(juegoNuevo,3500);

                }
                          
            } 
            
        }else{
            alert("ingresa una letra");
        }
        
    });
    
}

//dibujo ahorcado

dibujo = (part) => {
    switch (part) {

        case 'estructura' :
            dibujarEstructura();
            break;

        case 'cabeza':
            pincel.fillStyle = "#ff5557";
            pincel.fillRect(160, 90, 40, 35);
            break;

        case 'cuerpo':
            dibujarLinea(180,125,180,170,"#ff5557");
            break;

        case 'manoDer':
            dibujarLinea(155,140,180,135,"#ff5557");
            break;

        case 'manoIzq':
            dibujarLinea(180,135,205,140,"#ff5557");
            break;

        case 'pieDer':
            dibujarLinea(160,185,180,165,"#ff5557");
            break;

        case 'pieIzq':
            dibujarLinea(180,165,200,185,"#ff5557");
            break;

        
    }
}
const draws = [
    'estructura',
    'cabeza',
    'cuerpo',
    'manoDer',
    'manoIzq',
    'pieIzq',
    'pieDer',
    
]







