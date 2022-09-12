function encriptar(){
    var texto=documento.getElementById("entradaTexto").value.toLowerCase();

    var textoEncriptado=frase.replace(/e/img, "enter");
    var textoEncriptado=textoEncriptado.replace(/o/img, "ober");
    var textoEncriptado=textoEncriptado.replace(/i/img, "imes");
    var textoEncriptado=textoEncriptado.replace(/a/img, "ai");
    var textoEncriptado=textoEncriptado.replace(/u/img, "ufat");

    document.getElementById("textoDesencriptado").innerHTML=textoEncriptado;
}