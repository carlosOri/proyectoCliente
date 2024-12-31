
// Función que inicializa la aplicación
const runApp = () => {
  // Recuperar registros del localStorage
  listaStorage = JSON.parse(localStorage.getItem("lista")) || [];
  const iu = new Iu(listaStorage);

  // Crear el HTML de los registros
  iu.crearHtml();
  iu.editarRegistros();  //maneja la edición de registros
  // Evento que inserta los registros
  botonCrear();

  // Actualizar el localStorage después de cada cambio
  localStorage.setItem("lista", JSON.stringify(listaStorage));

  // Si es necesario reiniciar el formulario después de la edición o creación
  // resetear();  // Si decides usar esta función en algún momento
};

// Arrancar la aplicación
runApp();
