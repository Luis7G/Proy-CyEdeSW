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

// searchBtn.onclick = function() {
//     const searchValue = document.querySelector('#search-input').value;

//     if (searchValue) {
//         // Mantiene el comportamiento actual
//         fetch('http://localhost:5000/search/' + searchValue)
//           .then(response => response.json())
//           .then(data => loadHTMLTable(data['data']));
//       } else {
//         // Realizar petición a la ruta /getAll para obtener todos los registros
//         fetch('http://localhost:5000/getAll')
//         .then(response => response.json())
//         .then(data => loadHTMLTable(data['data']));
//       }

//     // fetch('http://localhost:5000/search/' + searchValue)
//     // .then(response => response.json())
//     // .then(data => loadHTMLTable(data['data']));
// }

// function fillFields(id) {
//   const data = await dbService.getShareById(id);

//   // Llena los campos con los datos de la acción
//   document.querySelector("input[name='nombre']").value = data.nombre;
//   document.querySelector("input[name='fecha_compra']").value = data.fecha_compra;
//   document.querySelector("input[name='precio_compra']").value = data.precio_compra;
//   document.querySelector("input[name='cantidad']").value = data.cantidad;
//   document.querySelector("input[name='costo_total']").value = data.costo_total;
// }


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
      // tableRows[i].querySelector('td:nth-child(7)').textContent = updatedData.cambio; // Agregar cambio
      // tableRows[i].querySelector('td:nth-child(8)').textContent = updatedData.ganacia_perdida; // Agregar ganancia_perdida
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

// function handleEditRow(id) {
//     // const updateSection = document.querySelector('#update-row');
//     // updateSection.hidden = false;
//     // document.querySelector('#update-name-input').dataset.id = id;



//     const updateSection = document.querySelector('#update-row');
//     updateSection.hidden = false;
//     const row = document.querySelector(`table tr[data-id="${id}"]`);
//     if (row) { // Comprueba si la fila existe
//         const nombre = row.querySelector('td:nth-child(2)').textContent;
//         const fechaCompra = row.querySelector('td:nth-child(3)').textContent;
//         const precioCompra = row.querySelector('td:nth-child(4)').textContent;
//         const cantidad = row.querySelector('td:nth-child(5)').textContent;
//         document.querySelector('#update-name-input').value = nombre;
//         document.querySelector('#update-date-input').value = fechaCompra;
//         document.querySelector('#update-price-input').value = precioCompra;
//         document.querySelector('#update-quantity-input').value = cantidad;
//         document.querySelector('#update-name-input').dataset.id = id;

//       } else {
//         console.error('Fila no encontrada');
//       } 

// }

// function handleEditRow(id) {
//     const updateSection = document.querySelector('#update-row');
//     updateSection.hidden = false;

//     const tableRows = document.querySelectorAll('table tbody tr');

//     for (const row of tableRows) {
//         if (row.dataset.id === id) {
//             const nombre = row.querySelector('td:nth-child(2)').textContent;
//             const fechaCompra = row.querySelector('td:nth-child(3)').textContent;
//             const precioCompra = row.querySelector('td:nth-child(4)').textContent;
//             const cantidad = row.querySelector('td:nth-child(5)').textContent;

//             document.querySelector('#update-name-input').value = nombre;
//             document.querySelector('#update-date-input').value = fechaCompra;
//             document.querySelector('#update-price-input').value = precioCompra;
//             document.querySelector('#update-quantity-input').value = cantidad;
//             document.querySelector('#update-name-input').dataset.id = id;
//             return; // Salimos del bucle una vez que encontramos la fila
//         }
//     }

//     console.error('Fila no encontrada');
// }

//SI VALE
async function handleEditRow(id) {
  const updateSection = document.querySelector('#update-row');
  updateSection.hidden = false;
  window.location.hash = '#update-row';


  const updateInputs = document.querySelectorAll(['#update-name-input', '#update-date-input', '#update-price-input', '#update-quantity-input']);
  for (const updateInput of updateInputs) {
    updateInput.dataset.id = id;
  }

  // for (const updateInput of updateInputs) {
  //   updateInput.dataset.id = id;
  // }

  //Anterior
  // fetch('http://localhost:5000/get-by-id/' + id) // Suponiendo que tu servidor tenga una ruta para obtener datos por ID
  // .then(response => response.json())
  // .then(rowData => {
  //   // Rellenar los campos de entrada con los datos obtenidos
  //   const updateInputs = document.querySelectorAll(['#update-name-input', '#update-date-input', '#update-price-input', '#update-quantity-input']);
  //   updateInputs.forEach(input => {
  //     const property = input.id.replace('update-', '');
  //     input.value = rowData[property];
  //   });
  // });

  // Obtiene los campos a rellenar
  // const fields = {
  //   name: document.querySelector('#update-name-input'),
  //   date: document.querySelector('#update-date-input'),
  //   price: document.querySelector('#update-price-input'),
  //   quantity: document.querySelector('#update-quantity-input'),
  // };

  // // Obtiene los datos de la base de datos
  // fetch('http://localhost:5000/getAll')
  //   .then(response => response.json())
  //   .then(data => {
  //     // Encuentra la fila con el ID especificado
  //     const row = data['data'].find(row => row.id === id);

  //     // Llena los campos con los datos de la fila
  //     fields.name.value = row.nombre;
  //     fields.date.value = row.fecha_compra;
  //     fields.price.value = row.precio_compra;
  //     fields.quantity.value = row.cantidad;

  //     // Agrega código adicional para manejar el evento de actualización de la fila
  //   })
  //   .catch(error => console.error(error));

  //     // Obtener los datos de la fila a editar
  // const db = dbService.getDbServiceInstance();
  // const rowData = db.getRowById(id);

  // // Rellenar los campos del formulario
  // const updateInputs = document.querySelectorAll(['#update-name-input', '#update-date-input', '#update-price-input', '#update-quantity-input']);
  // updateInputs.forEach(input => {
  //   input.value = rowData[input.id.replace('update-', '')];
  // });

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

// function handleEditRow(id) {
//     const updateSection = document.querySelector('#update-row');
//     updateSection.hidden = false;

//     const row = document.querySelector(`table tr[data-id="${id}"]`);
//     const column = row.querySelector('td:nth-child(2)').textContent;
//     document.querySelector(`#update-${column}-input`).dataset.id = id;
//   }

//   function handleEditRow(id) {
//     const updateSection = document.querySelector('#update-row');
//     updateSection.hidden = false;

//     const row = document.querySelector(`table tr[data-id="${id}"]`);
//     const column = row.querySelector('td:nth-child(2)').textContent;

//     const updateNameInput = document.querySelector('#update-name-input');
//     updateNameInput.dataset.id = id;

//     const updateFechaCompraInput = document.querySelector('#update-fecha-compra-input');
//     updateFechaCompraInput.dataset.id = id;

//     const updatePrecioCompraInput = document.querySelector('#update-precio-compra-input');
//     updatePrecioCompraInput.dataset.id = id;

//     const updateCantidadInput = document.querySelector('#update-cantidad-input');
//     updateCantidadInput.dataset.id = id;
//   }


// function handleEditRow(id) {
//     const updateSection = document.querySelector('#update-row');
//     updateSection.hidden = false;

//     const updateInputs = document.querySelectorAll(['#update-name-input', '#update-date-input', '#update-price-input', '#update-quantity-input', '#update-total-input']);

//     for (const updateInput of updateInputs) {
//       updateInput.dataset.id = id; // Establecer el ID en el dataset.id de cada campo
//     }
// }


// function handleEditRow(id, nombre, fecha_compra, precio_compra, cantidad) {
//     const updateSection = document.querySelector('#update-row');
//     updateSection.hidden = false;

//     const updateInputs = document.querySelectorAll(['#update-name-input', '#update-date-input', '#update-price-input', '#update-quantity-input']);

//     for (const updateInput of updateInputs) {
//         updateInput.dataset.id = id;
//     }

//     // Asignar valores directamente a los campos de edición
//     document.querySelector('#update-name-input').value = nombre;
//     document.querySelector('#update-date-input').value = fecha_compra;
//     document.querySelector('#update-price-input').value = precio_compra;
//     document.querySelector('#update-quantity-input').value = cantidad;
// }





// updateBtn.onclick = function() {
//     const updateNameInput = document.querySelector('#update-name-input');
//         console.log(updateNameInput);

//     fetch('http://localhost:5000/update', {
//         method: 'PATCH',
//         headers: {
//             'Content-type' : 'application/json'
//         },
//         body: JSON.stringify({
//             id: updateNameInput.dataset.id,
//             nombre: updateNameInput.value
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             location.reload();
//         }
//     })

// const updateBtns = document.querySelectorAll('#edit-row-btn');

// updateBtns.forEach(function(btn) {
//   btn.addEventListener('click', function() {
//     const updateSection = document.querySelector('#update-row');
//     updateSection.hidden = false;

//     window.location.hash = '#update-row';
//   });
// });

//SI VALE
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
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     location.reload();
    //     // fetchAndUpdateTable();
    //   }
    // })
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


// updateBtn.onclick = function() {
//     const updateNameInput = document.querySelector('#update-name-input');
//     const updateFechaCompraInput = document.querySelector('#update-fecha-compra-input');
//     const updatePrecioCompraInput = document.querySelector('#update-precio-compra-input');
//     const updateCantidadInput = document.querySelector('#update-cantidad-input');

//     fetch('http://localhost:5000/update', {
//       method: 'PATCH',
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         id: updateNameInput.dataset.id,
//         column: updateNameInput.dataset.column,
//         value: updateNameInput.value
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         location.reload();
//       }
//     })
//   }


// const updateInputs = document.querySelectorAll(['#update-name-input','#update-date-input', '#update-price-input', '#update-quantity-input']);

// for (const updateInput of updateInputs) {
//   const id = updateInput.dataset.id;
//   const value = updateInput.value;

//   fetch(`http://localhost:5000/update`, {
//     method: 'PATCH',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({ id, value })
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         location.reload();
//       }
//     });
// }



// }

// updateBtn.onclick = function() {
//     const updateInputs = document.querySelectorAll(['#update-name-input', '#update-date-input', '#update-price-input', '#update-quantity-input']);

//     const id = updateInputs[0].dataset.id;
//     const data = {};

//     for (let i = 0; i < updateInputs.length; i++) {
//       const field = updateInputs[i].id.replace('update-', '');
//       data[field] = updateInputs[i].value;
//     }

//     fetch(`http://localhost:5000/update/`, {
//       method: 'PATCH',
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.success) {
//           // Actualizar la fila correspondiente en la tabla usando JavaScript
//           console.log('Actualización exitosa');
//           // Actualiza la fila en el front-end aquí
//         } else {
//           console.error('Error al actualizar');
//         }
//       });
//   }


// updateBtn.onclick = async function () {
//     const updateInputs = document.querySelectorAll(['#update-name-input', '#update-date-input', '#update-price-input', '#update-quantity-input']);

//     const id = updateInputs[0].dataset.id;
//     const data = {};

//     for (let i = 0; i < updateInputs.length; i++) {
//         const field = updateInputs[i].id.replace('update-', '');
//         data[field] = updateInputs[i].value;
//     }

//     try {
//         const response = await fetch(`http://localhost:5000/update/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         const responseData = await response.json();

//         if (responseData.success) {
//             console.log('Actualización exitosa');
//             location.reload();
//         } else {
//             console.error('Error al actualizar');
//         }
//     } catch (error) {
//         console.error('Error en la solicitud:', error);
//     }
// };

// updateBtn.onclick = async function () {
//     const updateInputs = document.querySelectorAll(['#update-name-input', '#update-date-input', '#update-price-input', '#update-quantity-input']);

//     const id = updateInputs[0].dataset.id;
//     const data = {
//         nombre: updateInputs[0].value,
//         fecha_compra: updateInputs[1].value,
//         precio_compra: updateInputs[2].value,
//         cantidad: updateInputs[3].value
//     };

//     try {
//         const response = await fetch(`http://localhost:5000/update`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({ id, ...data })
//         });

//         const responseData = await response.json();

//         if (responseData.success) {
//             console.log('Actualización exitosa');
//             location.reload();
//         } else {
//             console.error('Error al actualizar');
//         }
//     } catch (error) {
//         console.error('Error en la solicitud:', error);
//     }
// };


const addBtn = document.querySelector('#add-btn');

// addBtn.onclick = function () {
//   // const nameInput = document.querySelector('#name-input');
//   // const name = nameInput.value;
//   // nameInput.value = "";

//   // fetch('http://localhost:5000/insert', {
//   //     headers: {
//   //         'Content-type': 'application/json'
//   //     },
//   //     method: 'POST',
//   //     body: JSON.stringify({ name : name})
//   // })
//   // .then(response => response.json())
//   // .then(data => insertRowIntoTable(data['data']));


//   const nameInput = document.querySelector('#name-input');
//   const nombre = nameInput.value.trim();
//   nameInput.value = '';


//   // const fechaCompraInput = document.querySelector('#date-input');
//   // const fecha_compra = fechaCompraInput.value;
//   // fechaCompraInput.value = "";

//   // const precioCompraInput = document.querySelector('#price-input');
//   // const precio_compra = precioCompraInput.value;
//   // precioCompraInput.value = "";

//   // const cantidadInput = document.querySelector('#quantity-input');
//   // const cantidad = cantidadInput.value;
//   // cantidadInput.value = "";
//   const fechaCompraInput = document.querySelector('#date-input');
//   const fecha_compra = fechaCompraInput.value.trim();
//   fechaCompraInput.value = '';


//   const precioCompraInput = document.querySelector('#price-input');
//   const precio_compra = parseFloat(precioCompraInput.value.trim());

//   if (isNaN(precio_compra) || precio_compra <= 0) {
//     alert('Por favor, ingrese un precio de compra válido.');
//     precioCompraInput.value = '';
//     // Puedes añadir un return aquí si quieres detener la ejecución del código
//   }

//   const cantidadInput = document.querySelector('#quantity-input');
//   const cantidad = parseInt(cantidadInput.value.trim());

//   if (isNaN(cantidad) || cantidad <= 0) {
//     alert('Por favor, ingrese una cantidad válida.');
//     cantidadInput.value = '';
//   }


//   fetch('http://localhost:5000/insert', {
//     headers: {
//       'Content-type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify({
//       // id: id,
//       nombre: nombre,
//       fecha_compra: fecha_compra,
//       precio_compra: precio_compra,
//       cantidad: cantidad
//     })
//   })
//     .then(response => response.json())
//     .then(data => insertRowIntoTable(data['data']));
//   setTimeout(function () {
//     window.location.reload();
//   }, 2000); // 3000 milisegundos = 3 segundos


//   // .then(response => response.json())
//   // .then(data => {
//   //   if (data && data.data) {
//   //     insertRowIntoTable(data.data);
//   //   } else {
//   //     // Manejar situaciones donde no se reciban los datos esperados
//   //     console.error('No se recibieron los datos esperados del servidor');
//   //   }
//   // })
//   // .catch(error => {
//   //   // Manejar errores de la solicitud fetch o del servidor
//   //   console.error('Error al insertar la acción:', error);
//   // });
// }

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

// document.addEventListener('DOMContentLoaded', function() {
//   const addBtn = document.getElementById("add-btn");

//   addBtn.addEventListener("click", function(event) {
//       // Previene el comportamiento por defecto si está dentro de un formulario
//       event.preventDefault();

//       // Definiciones de las variables nombre, fecha_compra, precio_compra, cantidad, etc.
//       // Asegúrate de recoger estos valores correctamente del formulario

//       fetch('http://localhost:5000/insert', {
//           headers: {
//               'Content-type': 'application/json'
//           },
//           method: 'POST',
//           body: JSON.stringify({
//               nombre: nombre,
//               fecha_compra: fecha_compra,
//               precio_compra: precio_compra,
//               cantidad: cantidad
//           })
//       })
//       .then(response => response.json())
//       .then(data => {
//           // Inserta la fila en la tabla o maneja los datos como sea necesario
//           // Por ejemplo, podrías llamar aquí a `insertRowIntoTable(data['data']);`

//           // Redirige al usuario
//           window.location.href = "#mostrar";
//           // Opcional: Considera si necesitas recargar la página
//       })
//       .catch(error => {
//           console.error('Error:', error);
//           // Manejo adecuado del error
//       });
//   });
// });



// function insertRowIntoTable(data) {
//   console.log(data);
//   const table = document.querySelector('table tbody');
//   const isTableData = table.querySelector('.no-data');

//   let tableHtml = "<tr>";

//   for (var key in data) {
//     if (data.hasOwnProperty(key)) {
//       if (key === 'dateAdded') {
//         data[key] = new Date(data[key]).toLocaleString();
//       }
//       tableHtml += `<td>${data[key]}</td>`;
//     }
//   }

//   tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Eliminar</td>`;
//   tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Editar</td>`;

//   tableHtml += "</tr>";

//   if (isTableData) {
//     table.innerHTML = tableHtml;
//   } else {
//     const newRow = table.insertRow();
//     newRow.innerHTML = tableHtml;
//   }

// }

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

  // Añadir evento a los botones de editar después de que se hayan creado
  // const editBtns = document.querySelectorAll('button.edit-row-btn');
  // editBtns.forEach(function(btn) {
  //   btn.addEventListener('click', function() {
  //     window.location.hash = '#update-row';
  //   });
  // });

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




// const fetch = require('node-fetch'); //Lo nuevo
// async function obtenerPrecioActual(symbol) { // Lo nuevo
//   const apiKey = '15YYLK7OSX6BMQWI';
//   const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data["Global Quote"]["05. price"]; // Obtén el precio actual
//   } catch (error) {
//     console.error('Error al obtener el precio actual:', error);
//   }
// }