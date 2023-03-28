document.addEventListener("DOMContentLoaded", function () {
  const universidadesSelect = document.getElementById("universidades");
  const periodosSelect = document.getElementById("periodos");
  const carrerasSelect = document.getElementById("carreras");
  const gruposSelect = document.getElementById("grupos");

  const periodoSeleccionado = document.getElementById("periodoSeleccionado");
  const unidadAcademica = document.getElementById("unidadAcademica");
  const carreraSeleccionada = document.getElementById("carreraSeleccionada");
  const grupoSeleccionado = document.getElementById("grupoSeleccionado");

  const tabla = document.querySelector(".table tbody");

  const imprimirBtn = document.getElementById("imprimir");
  const exportarBtn = document.getElementById("exportar");

  function actualizarEtiquetas() {
    periodoSeleccionado.textContent = periodosSelect.value;
    unidadAcademica.textContent = universidadesSelect.value;
    carreraSeleccionada.textContent = carrerasSelect.value;
    grupoSeleccionado.textContent = gruposSelect.value;

    llenarTabla();
  }
  function generarDatosAleatorios() {
    const datos = [];

    for (let i = 0; i < 10; i++) {
      datos.push({
        matricula: Math.floor(Math.random() * 100000),
        alumno: `Alumno ${i + 1}`,
        direccion: `Calle ${i + 1}`,
        telefono: `+${Math.floor(Math.random() * 10000000000)}`,
        email: `alumno${i + 1}@example.com`,
        estatusAcademico: Math.random() < 0.5 ? "Activo" : "Inactivo",
        estatusInscripcion: Math.random() < 0.5 ? "Inscrito" : "No inscrito",
        fechaNacimiento: '1990-01-01',
        rfc: 'AAAA900101AAA',
        estadoCivil: 'Soltero',
        pais: 'México',
        ciudadOrigen: 'Aguascalientes',
        sexo: 'Masculino',
        curp: 'AAAA900101HCCAAA00',
        telefonoMovil: `+${Math.floor(Math.random() * 10000000000)}`,
        nacionalidad: 'Mexicana',
        estado: 'Aguascalientes',
      });
    }
    return datos;
  }

  function llenarTabla() {
    const datos = generarDatosAleatorios();
  
    tabla.innerHTML = "";
  
    for (const dato of datos) {
      const fila = document.createElement("tr");
      const camposParaMostrar = Object.keys(dato).slice(0, 7);
  
      for (const clave of camposParaMostrar) {
        const celda = document.createElement("td");
        celda.textContent = dato[clave];
        fila.appendChild(celda);
  
        // Agregar event listener a la celda del nombre del alumno
        if (clave === "alumno") {
          celda.style.cursor = "pointer";
          celda.addEventListener("click", () => {
            abrirModalDetallesAlumno(dato);
          });
        }
      }
  
      tabla.appendChild(fila);
    }
  }
  
  function abrirModalDetallesAlumno(dato) {
    // Llenar los campos del modal con la información del alumno
    document.getElementById("nombre").textContent = dato.alumno;
    document.getElementById("fechaNacimiento").textContent = dato.fechaNacimiento;
    document.getElementById("rfc").textContent = dato.rfc;
    document.getElementById("correo").textContent = dato.email;
    document.getElementById("estadoCivil").textContent = dato.estadoCivil;
    document.getElementById("pais").textContent = dato.pais;
    document.getElementById("ciudadOrigen").textContent = dato.ciudadOrigen;
    document.getElementById("sexo").textContent = dato.sexo;
    document.getElementById("curp").textContent = dato.curp;
    document.getElementById("telefonoMovil").textContent = dato.telefonoMovil;
    document.getElementById("nacionalidad").textContent = dato.nacionalidad;
    document.getElementById("estado").textContent = dato.estado;
    document.getElementById("direccionModal").textContent = dato.direccion;
    document.getElementById("telefonoModal").textContent = dato.telefono;
    document.getElementById("alternativo").textContent = dato.alternativo;
  
    // Abrir el modal
    const modal = new bootstrap.Modal(document.getElementById("modalDetallesAlumno"));
    modal.show();
  }
  
  // Event listeners para los selects
  universidadesSelect.addEventListener("change", actualizarEtiquetas);
  periodosSelect.addEventListener("change", actualizarEtiquetas);
  carrerasSelect.addEventListener("change", actualizarEtiquetas);
  gruposSelect.addEventListener("change", actualizarEtiquetas);

  // Funcionalidad de los botones
  imprimirBtn.addEventListener("click", function () {
    window.print();
  });

  exportarBtn.addEventListener("click", exportarAExcel);

  // Inicializar y cargar datos en los selects (reemplazar con datos reales)
  function cargarDatos() {
    // Ejemplo de cómo agregar opciones a un select
    universidadesSelect.innerHTML =
      "<option>Universidad 1</option><option>Universidad 2</option>";
    periodosSelect.innerHTML =
      "<option>Enero - Abril 2023</option><option>Enero - Junio 2023</option>";
    carrerasSelect.innerHTML =
      "<option>Carrera 1</option><option>Carrera 2</option>";
    gruposSelect.innerHTML = "<option>Grupo 1</option><option>Grupo 2</option>";

    // Actualizar etiquetas con valores iniciales
    actualizarEtiquetas();
  }

  cargarDatos();
});
function imprimirPagina() {
  window.print();
}

function exportarAExcel() {
  const tabla = document.querySelector(".table");
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(tabla);
  const nombreArchivo = "tabla_exportada.xlsx";

  XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
  XLSX.writeFile(wb, nombreArchivo);
}
