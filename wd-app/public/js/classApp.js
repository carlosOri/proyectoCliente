// Clase Persona
class Persona {
  // Constructor
  constructor(nombre, apellido, segundoApellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.segundoApellido = segundoApellido;
  }
}

class Cliente extends Persona {
  constructor(nombre, apellido, segundoApellido, dni, nacimiento, mensaje) {
    super(nombre, apellido, segundoApellido);
    const fecha = new Date();
    
    // Formatear la fecha
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes inicia en 0
    const anio = fecha.getFullYear();

    // Formatear la hora
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    this.fechaCita = `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;;
    this.dni = dni;
    this.nacimiento = nacimiento;
    this.mensaje = mensaje;
  }

  setNombre(nuevoNombre) {
    this.nombre = nuevoNombre;
  }

  getNombre() {
    return this.nombre;
  }

  setApellido(nuevoApellido) {
    this.apellido = nuevoApellido;
  }

  getApellido() {
    return this.apellido;
  }

  setSegundoApellido(nuevoSegundoApellido) {
    this.segundoApellido = nuevoSegundoApellido;
  }

  getSegundoApellido() {
    return this.segundoApellido;
  }

  asignarId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  // Getter para el atributo edit
  getEdit() {
    return this._edit;
  }

  // Setter para el atributo edit
  setEdit(value) {
    if (typeof value !== "boolean") {
      throw new Error("El valor de edit debe ser un booleano.");
    }
    this._edit = value;
  }

  setDni(dni) {
    this.id = dni;
  }

  getDni() {
    return this.dni;
  }
}

class Iu {
  constructor(lista) {
    this.lista = lista;
  }

  crearHtml() {
    const mensage = document.querySelector("#no-registros");
    mensage.classList.add("visible");
    // contenedor registros
    let containerTexto = document.querySelector("#registros");
    this.lista.forEach((element) => {
      // texto de los registros inicio localStorage
      let texto = document.createElement("DIV");
      texto.classList.add("p-registro");
      let botones = document.createElement("DIV");
      botones.classList.add('estilo-botones');
      texto.innerHTML = `
        <p><span class="resaltado" >Fecha:</span> ${element.fechaCita}</p>
        <p><span class="resaltado">Nombre:</span> ${element.nombre}</p>
        <p><span class="resaltado" >Apellido:</span> ${element.apellido}</p>
        <p><span class="resaltado">Segundo Apellido:</span> ${element.segundoApellido}</span>
        <p><span class="resaltado">Dni:</span> ${element.dni}</span>
        <p><span class="resaltado" >Fecha nacimiento:</span> ${element.nacimiento}</span>
        <p><span class="resaltado" >Mensaje:</span> ${element.mensaje}</span>`;

      // crear botones del registro
      let b_borrar = document.createElement("button");
      let b_editar = document.createElement("button");
      b_borrar.textContent = "Borrar";
      b_editar.textContent = "Editar";
      b_borrar.classList.add("boton-borrar");
      b_editar.classList.add("boton-editar");

      // crear div container registros y botones
      let containerRegistro = document.createElement("DIV");
      containerRegistro.classList.add("estilo-registro");
      containerRegistro.setAttribute("data-id", element.id);
      containerRegistro.appendChild(texto);
      botones.appendChild(b_borrar);
      botones.appendChild(b_editar);
      containerRegistro.appendChild(botones);

      // insertar en el html
      containerTexto.appendChild(containerRegistro);

      const mensage = document.querySelector("#no-registros");
      if (this.lista.length < 1) {
        mensage.classList.remove("animacion-texto");
        mensage.classList.add("visible");
      } else {
        mensage.classList.remove("visible");
        mensage.classList.add("animacion-texto");
      }

      localStorage.setItem("lista", JSON.stringify(this.lista));
    });

    // Delegación de eventos para los botones
    containerTexto.addEventListener("click", (e) => {
      // Verificar si el clic fue en un botón de borrar
      if (e.target && e.target.classList.contains("boton-borrar")) {
        // Encuentra el contenedor del registro
        let registro = e.target.closest(".estilo-registro");
        let indice = Number(registro.getAttribute("data-id"));

        // Borrar el registro de la lista
        let index = this.lista.findIndex((i) => i.id === indice);
        if (index !== -1) {
          this.lista.splice(index, 1); // Eliminar el registro de la lista
          registro.remove(); // Eliminar el registro del DOM
          localStorage.setItem("lista", JSON.stringify(this.lista)); // Actualizar localStorage
        }
        const mensage = document.querySelector("#no-registros");
        if (this.lista.length < 1) {
          mensage.classList.add("visible");
          mensage.classList.remove("animacion-texto");
        } else {
          mensage.classList.remove("visible");
          mensage.classList.add("animacion-texto");
        }
      }
    });
  }

  // editarRegistros() {
  //   const container = document.querySelector("#registros");
  //   container.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     if (e.target.classList.contains("boton-editar")) {
  //       let registro = e.target.closest(".estilo-registro");
  //       let indice = Number(registro.getAttribute("data-id"));

  //       // Buscar en `listaStorage`
  //       const cliente = this.lista.find((c) => c.id === indice);
  //       if (cliente) {
  //         // Antes de editar, rellenar el formulario
  //         i_nombre.value = cliente.nombre;
  //         i_apellido.value = cliente.apellido;
  //         i_subApellido.value = cliente.segundoApellido;
  //       }
  //     }
  //     localStorage.setItem("lista", JSON.stringify(this.lista)); // Actualizar localStorage
  //   });
  // }
}
