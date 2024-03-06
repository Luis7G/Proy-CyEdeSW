document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => {
      loadHTMLTable(data['data']);
    });

});


document.querySelector('table tbody').addEventListener('click', function (event) {
  if (event.target.className === "delete-row-btn") {
    deleteRowById(event.target.dataset.id);
  }
  if (event.target.className === "edit-row-btn") {
    handleEditRow(event.target.dataset.id);
  }
});


function fetchAndUpdateTable() {
  fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => {
      loadHTMLTable(data['data']);
    });
}

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');


function updateTable(updatedData, id) {
  const tableRows = document.querySelectorAll('table tbody tr');

  for (let i = 0; i < tableRows.length; i++) {
    const rowId = tableRows[i].querySelector('button.edit-row-btn').getAttribute('data-id');

    if (rowId === id) {
      // Actualizar los datos de la fila correspondiente
      tableRows[i].querySelector('td:nth-child(2)').textContent = updatedData.nombre;
      tableRows[i].querySelector('td:nth-child(3)').textContent = new Date(updatedData.fecha_compra).toLocaleDateString();
      tableRows[i].querySelector('td:nth-child(4)').textContent = updatedData.precio_compra;
      tableRows[i].querySelector('td:nth-child(5)').textContent = updatedData.cantidad;
      tableRows[i].querySelector('td:nth-child(6)').textContent = updatedData.costo_total;
      break;
    }
  }
}



function deleteRowById(id) {
  fetch('http://localhost:5000/delete/' + id, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        location.reload();
      }
    });
}

async function handleEditRow(id) {
  const updateSection = document.querySelector('#update-row');
  updateSection.hidden = false;
  window.location.hash = '#update-row';


  const updateInputs = document.querySelectorAll(['#update-name-input', '#update-date-input', '#update-price-input', '#update-quantity-input']);
  for (const updateInput of updateInputs) {
    updateInput.dataset.id = id;
  }

  // Obtener los datos de la fila por ID
  try {
    const response = await fetch(`http://localhost:5000/get-by-id/${id}`);
    const data = await response.json();

    const formattedDate = new Date(data.fecha_compra).toLocaleDateString('en-CA'); // Puedes ajustar 'en-CA' según tus necesidades


    // Llenar los campos de entrada con los datos de la fila
    document.querySelector('#update-name-input').value = data.nombre;
    document.querySelector('#update-date-input').value = formattedDate;
    document.querySelector('#update-price-input').value = data.precio_compra;
    document.querySelector('#update-quantity-input').value = data.cantidad;
  } catch (error) {
    console.error('Error al obtener los datos de la fila:', error);
  }



}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Agrega un 0 delante si el mes es de un solo dígito
  const day = String(date.getDate()).padStart(2, '0'); // Agrega un 0 delante si el día es de un solo dígito

  return `${year}-${month}-${day}`;
}


updateBtn.onclick = function () {
  const updateNameInput = document.querySelector('#update-name-input');
  const updateFechaCompraInput = document.querySelector('#update-date-input');
  const updatePrecioCompraInput = document.querySelector('#update-price-input');
  const updateCantidadInput = document.querySelector('#update-quantity-input');

  fetch('http://localhost:5000/update', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      id: updateNameInput.dataset.id,
      nombre: updateNameInput.value,
      fecha_compra: updateFechaCompraInput.value,
      precio_compra: updatePrecioCompraInput.value,
      cantidad: updateCantidadInput.value
    })
  })

    .then(response => response.json())
    .then(data => {

      if (data.success) {
        // Puedes optar por mostrar un mensaje de éxito aquí
        setTimeout(function () {
          window.location.reload();
        }, 3000); // 3000 milisegundos = 3 segundos
      } else {
        // Manejar el caso de que la actualización no sea exitosa
        console.error('La actualización no fue exitosa.');
        // Por ejemplo, mostrando un mensaje de error al usuario
      }
    })
    .catch(error => {
      console.error('Error al actualizar:', error);
      // Aquí también podrías optar por mostrar un mensaje de error
    });
};


const addBtn = document.querySelector('#add-btn');

addBtn.onclick = function () {
  const nameInput = document.querySelector('#name-input');
  const nombre = nameInput.value;
  nameInput.value = "";

  const fechaCompraInput = document.querySelector('#date-input');
  const fecha_compra = fechaCompraInput.value;
  fechaCompraInput.value = "";

  const precioCompraInput = document.querySelector('#price-input');
  const precio_compra = precioCompraInput.value;
  precioCompraInput.value = "";

  const cantidadInput = document.querySelector('#quantity-input');
  const cantidad = cantidadInput.value;
  cantidadInput.value = "";


  fetch('http://localhost:5000/insert', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      // id: id,
      nombre: nombre,
      fecha_compra: fecha_compra,
      precio_compra: precio_compra,
      cantidad: cantidad
    })
  })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
  setTimeout(function () {
    window.location.reload();
  }, 2000); // 3000 milisegundos = 3 segundos

}

function insertRowIntoTable(data) {
  console.log(data);
  const table = document.querySelector('table tbody');
  const isTableData = table.querySelector('.no-data');

  let tableHtml = "<tr>";

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === 'dateAdded') {
        data[key] = new Date(data[key]).toLocaleString();
      }
      tableHtml += `<td>${data[key]}</td>`;
    }
  }

  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Eliminar</button></td>`;
  tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Editar</button></td>`;

  tableHtml += "</tr>";

  // Si existe un marcador de "no-data", lo removemos y agregamos la nueva fila.
  if (isTableData) {
    table.innerHTML = ""; // Limpiar para eliminar el marcador de no-data
  }

  // Añadir la nueva fila al final de la tabla
  table.innerHTML += tableHtml;
}





function loadHTMLTable(data) {
  const table = document.querySelector('table tbody');

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr> ";

    return;
  }

  let tableHtml = "";

  data.forEach(function ({ id, nombre, fecha_compra, precio_compra, cantidad, costo_total, cambio, ganancia_perdida }) {
    tableHtml += "<tr>";
    // tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${nombre}</td>`;
    tableHtml += `<td>${new Date(fecha_compra).toLocaleDateString()}</td>`;
    tableHtml += `<td>${precio_compra}</td>`;
    tableHtml += `<td>${cantidad}</td>`;
    tableHtml += `<td>${costo_total}</td>`;
    tableHtml += `<td>${cambio}% </td>`; // Añade la columna de cambio
    tableHtml += `<td>${ganancia_perdida}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Eliminar</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Editar</button></td>`;

    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;

  const editBtns = document.querySelectorAll('button.edit-row-btn');

  editBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const updateSection = document.querySelector('#update-row');
      window.scrollTo(0, updateSection.offsetTop);
    });
  });
}

document.querySelectorAll(".sortable").forEach(headerCell => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(headerCell.parentNode.children, headerCell);
    // Determina si el ordenamiento actual es ascendente
    const isAscending = headerCell.classList.contains("asc");
    // Llama a sortTableByColumn con el estado invertido
    sortTableByColumn(tableElement, headerIndex, !isAscending);

    // Actualiza las clases para todos los encabezados
    table.querySelectorAll("th").forEach(th => th.classList.remove("asc", "desc"));

    // Establece la clase correcta en el encabezado actual para indicar la dirección del ordenamiento
    headerCell.classList.toggle("asc", !isAscending);
    headerCell.classList.toggle("desc", isAscending);
  });
});

function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // Ordenar cada fila
  const sortedRows = rows.sort((a, b) => {
    const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
    const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
    // Utiliza localeCompare para la comparación de strings si es necesario
    return aColText.localeCompare(bColText) * dirModifier;
  });

  // Remover todas las filas existentes del cuerpo de la tabla
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  // Re-añadir las filas ya ordenadas al cuerpo de la tabla
  tBody.append(...sortedRows);
}