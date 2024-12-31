//variables
let i_nombre = document.querySelector("#nombre");
let i_apellido = document.querySelector("#apellido");
let i_subApellido = document.querySelector("#subApellido");
const b_crear = document.querySelector(".boton-crear");
const b_reset = document.querySelector(".boton-reset");
const container_registro = document.querySelector(".container-registros");
const container_alerta = document.querySelector(".container-alerta");
const cajaInput = document.querySelector(".caja-input");
const formulario = document.querySelector(".containerformulario");
const registrosHtml = document.querySelector("#registros");
const alerta_nombre = document.querySelector(".in-nombre");
const alerta_apellido = document.querySelector(".in-apellido");
const alerta_subApellido = document.querySelector(".in-subApellido");
const parrafo_inicio = document.querySelector(".visible");
//Array para insertar clientes
let listaStorage = [];
//variables para la funcion incrementoID
let n = 0;
let nID = 0;

const datosCliente = () => {
  //instancia de cliente
  const cliente = new Cliente(
    i_nombre.value.toLowerCase(),
    i_apellido.value.toLowerCase(),
    i_subApellido.value.toLowerCase()
  );

  let nombre = cliente.getNombre();
  let apellido = cliente.getApellido();
  let segundoApellido = cliente.getSegundoApellido();

  return {
    cliente,
    nombre,
    apellido,
    segundoApellido,
  };
};

//Evento resetear formulario
const resetear = () => {
  b_reset.addEventListener("click", () => {
    formulario.reset();
    i_nombre.classList.remove("bgAlerta");
    i_apellido.classList.remove("bgAlerta");
    i_subApellido.classList.remove("bgAlerta");
  });
};

// función 'incrementoID' para evitar IDs duplicados
let incrementoID = () => {
  let lista = JSON.parse(localStorage.getItem("lista")) || [];
  let maxId = 0;
  lista.forEach((cliente) => {
    if (cliente.id > maxId) {
      // Solo contar los registros no editados
      maxId = cliente.id;
    }
  });
  return maxId + 1;
};

//funcion que crea la alerta
const crearAlerta = (alerta) => {
  alerta.classList.add("alerta");
  alerta.innerText = `Campo obligatorio`;
  return alerta;
};

//funcion que inserta y borra del html la alerta
const alertaHtml = (a_pHtml, a_campo, a_contenedor) => {
  let alerta = crearAlerta(a_pHtml);
  a_contenedor.append(alerta);
  b_crear.disabled = true;
  a_campo.classList.add("bgAlerta");

  setTimeout(() => {
    alerta.remove();
    b_crear.disabled = false;
  }, 3000);
};

//funcion para validar los campos
const validarCampos = () => {
  let cliente = datosCliente().cliente;
  if (cliente.getNombre() === "") {
    let alerta_n = document.createElement("p");
    alertaHtml(alerta_n, i_nombre, alerta_nombre);
  } else {
    i_nombre.value = cliente.getNombre();
    i_nombre.classList.remove("bgAlerta");
    i_nombre.classList.add("caja-input");
  }

  if (cliente.getApellido() === "") {
    let alerta_a = document.createElement("p");
    alertaHtml(alerta_a, i_apellido, alerta_apellido);
  } else {
    i_apellido.value = cliente.getApellido();
    i_apellido.classList.remove("bgAlerta");
    i_apellido.classList.add("caja-input");
  }

  if (cliente.getSegundoApellido() === "") {
    let alerta_sA = document.createElement("p");
    alertaHtml(alerta_sA, i_subApellido, alerta_subApellido);
  } else {
    i_subApellido.value = cliente.getSegundoApellido();
    i_subApellido.classList.remove("bgAlerta");
    i_subApellido.classList.add("caja-input");
  }
  return cliente;
};

//Funcion que limpia el html de los mensages
const limpiarHtml = (contenedor) => {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild); // Elimina todos los hijos
  }
};

// funcion para el evento borrar registro
const borrarRegistro = (but, list, div, container) => {
  but.addEventListener("click", (e) => {
    e.preventDefault();
    let indice = Number(div.getAttribute("data-id"));
    let index = list.findIndex((c) => c.id === indice);
    if (index !== -1) {
      list.splice(index, 1);
      container.removeChild(div);
      localStorage.setItem("lista", JSON.stringify(list));
      //recuperar el mensaje de no hay registros
      const textoNoRegistros = document.querySelector("#no-registros");
      if (list.length < 1) {
        textoNoRegistros.classList.add("visible");
        textoNoRegistros.classList.remove("animacion-texto");
      } else {
        textoNoRegistros.classList.remove("visible");
        textoNoRegistros.classList.add("animacion-texto");
      }
    }
  });
};

//Funcion del evento editar
const editarRegistro = (lista, cliente) => {
  console.log(lista);
  //contenedor de eventos
  let contenedor = document.querySelector("#registros");
  contenedor.addEventListener("click", (e) => {
    e.preventDefault();
    let registro = e.target.closest(".estilo-registro");
    let indice = Number(registro.getAttribute("data-id"));
      let index = lista.findIndex((i) => i.id === cliente.id);
      console.log(index);
      if (index !== -1) {
        lista.push(cliente);
        localStorage.setItem("lista", JSON.stringify(lista));
      //}
    }
  });
};

const insertarHtml = (cliente) => {
  //recuperar listaStorage
  let lista = JSON.parse(localStorage.getItem("lista")) || [];
  //crear texto html
  let texto = document.createElement("P");
  texto.classList.add("p-registro");
  //crear contenedor de registro
  let divRegistros = document.createElement("DIV");
  divRegistros.classList.add("estilo-registro");
  divRegistros.setAttribute("data-id", cliente.id);
  //container html
  let contenedor = document.querySelector("#registros");
  //crear botones
  let b_borrar = document.createElement("BUTTON");
  let b_editar = document.createElement("BUTTON");
  b_borrar.classList.add("boton-borrar");
  b_editar.classList.add("boton-editar");
  b_borrar.textContent = "Borrar";
  b_editar.textContent = "Editar";
  //Insertar el texto con los valores de los clientes
  lista.forEach((element) => {
    texto.innerText = `- ${element.nombre} ${element.apellido} ${element.segundoApellido}`;
  });

  //inserta en el contenedor html
  divRegistros.appendChild(texto);
  divRegistros.appendChild(b_borrar);
  divRegistros.appendChild(b_editar);
  contenedor.appendChild(divRegistros);

  // funcion que borra los registros
  borrarRegistro(b_borrar, lista, divRegistros, contenedor);
  editarRegistro(lista, cliente);
  
};

//Funcion donde se insertan los clientes en el localStorage
const insertarArray = () => {
  let cliente = datosCliente().cliente;
  let id = incrementoID();

  //mensage de envio
  const mensage = document.createElement("P");
  const divMensage = document.querySelector("#mensage");
  mensage.textContent = "Datos enviados ...";
  limpiarHtml(divMensage);

  if (
    cliente.nombre !== "" &&
    cliente.apellido !== "" &&
    cliente.segundoApellido !== ""
  ) {
    //buscar que no hayan repetidos
    const encontrado = listaStorage.findIndex(
      (c) =>
        c.nombre === cliente.getNombre() &&
        c.apellido === cliente.getApellido() &&
        c.segundoApellido === cliente.getSegundoApellido()
    );

    //Si no esta repetido
    if (encontrado === -1) {
      //poner id al cliente
      cliente.asignarId(id);
      listaStorage.push(cliente);
      localStorage.setItem("lista", JSON.stringify(listaStorage));
      //mensaje de enviado
      mensage.innerText = "Enviando datos ...";
      mensage.classList.add("mensage");
      divMensage.appendChild(mensage);
      //resetear formulario
      formulario.reset();
      setTimeout(() => {
        mensage.classList.remove("mensage");
        divMensage.removeChild(mensage);
      }, 2000);
      //insertar html
      insertarHtml(cliente);
    } else {
      alert("El cliente ya esta en la lista");
      formulario.reset();
    }
  }
  console.log(cliente);
  localStorage.setItem("lista", JSON.stringify(listaStorage));
};

//evento click abarca las funciones previas a la inserción en el dom
const botonCrear = () => {
  let textoNoRegistros = document.querySelector("#no-registros");
  b_crear.addEventListener("click", (e) => {
    e.preventDefault();
    validarCampos();
    insertarArray();

    //mostrar texto de no registros
    if (listaStorage.length < 1) {
      textoNoRegistros.classList.add("visible");
      textoNoRegistros.classList.remove("animacion-texto");
    } else {
      textoNoRegistros.classList.remove("visible");
      textoNoRegistros.classList.add("animacion-texto");
    }

    localStorage.setItem("lista", JSON.stringify(listaStorage));
  });
};
