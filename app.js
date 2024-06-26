const encriptar = document.getElementById('encriptar');
const desencriptar = document.getElementById('desencriptar');
const copiar = document.getElementById('copiar');

let matriz = [
  ['e', 'enter'],
  ['i', 'imes'],
  ['a', 'ai'],
  ['o', 'ober'],
  ['u', 'ufat'],
];

function quitarContenedorEspera() {
  document.getElementById('contenedor-espera').style.display = 'none';
  return;
}
function recuperarContenedorEspera() {
  document.querySelector('.texto-espera').textContent = 'Copiado';
  document.getElementById('contenedor-espera').style.display = 'flex';
  return;
}

function condiciones(cadenaTexto) {
  var permitir = /^[a-z ]+$/;
  var noPermitir = /[^ ]+$/;
  if (permitir.test(cadenaTexto) && noPermitir.test(cadenaTexto)) {
    return true;
  } else {
    document.getElementById('contenedor-pcondicion').style.display =
      'inline-block';

    var numero = /^[a-z0-9 ]+$/;
    var acento = /^[a-zà-ÿÀ-ÿ ]+$/;
    var mayuscula = /^[a-zA-Z ]+$/;

    if (numero.test(cadenaTexto)) textoCondicion = 'números';
    else if (acento.test(cadenaTexto)) textoCondicion = 'acentos';
    else if (mayuscula.test(cadenaTexto)) textoCondicion = 'mayúsculas';
    else textoCondicion = 'caracteres especiales';
    document.getElementById(
      'texto-condicion'
    ).textContent = `No se permite ${textoCondicion}`;

    const cerrar = document.getElementById('cerrar');
    cerrar.addEventListener('click', () => {
      document.getElementById('contenedor-pcondicion').style.display = 'none';
    });

    return false;
  }
}

function accion(accion) {
  var textoIngresado = document.getElementById('texto-ingresado').value;
  var textoGenerado = document.getElementById('texto-generado');

  if (textoIngresado.length > 0) {
    if (condiciones(textoIngresado)) {
      if (accion === 'cifrado') {
        for (let i = 0; i < matriz.length; i++) {
          if (textoIngresado.includes(matriz[i][0])) {
            textoIngresado = textoIngresado.replaceAll(
              matriz[i][0],
              matriz[i][1]
            );
          }
        }
        textoGenerado = textoIngresado;
      } else if (accion === 'descifrado') {
        for (let i = matriz.length - 1; i >= 0; i--) {
          if (textoIngresado.includes(matriz[i][1])) {
            textoIngresado = textoIngresado.replaceAll(
              matriz[i][1],
              matriz[i][0]
            );
          }
        }
        textoGenerado = textoIngresado;
      }
      document.getElementById('texto-generado').textContent = textoGenerado;
      if (textoGenerado.length > 0) {
        quitarContenedorEspera();
      }
    }
  }
  return;
}

encriptar.addEventListener('click', () => accion('cifrado'));
desencriptar.addEventListener('click', () => accion('descifrado'));
copiar.addEventListener('click', () => {
  recuperarContenedorEspera();
  var sustituto = document.createElement('input');
  sustituto.setAttribute(
    'value',
    document.getElementById('texto-generado').textContent
  );
  document.body.appendChild(sustituto);
  sustituto.select();
  document.execCommand('copy');
  document.body.removeChild(sustituto);
  console.log(document.getElementById('texto-generado').textContent);
  document.getElementById('texto-generado').textContent = '';
  document.getElementById('texto-ingresado').value = '';
});
