const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
// const fetch = require('node-fetch'); //Lo nuevo
// dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// let fetch;

// (async () => {
//   fetch = (await import('node-fetch')).default;
// })(
//   async function obtenerPrecioActual(symbol) {
//     const apiKey = '15YYLK7OSX6BMQWI';
//     const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       return data["Global Quote"]["05. price"];
//     } catch (error) {
//       console.error('Error al obtener el precio actual:', error);
//     }
//   }

// );

let fetch;
import('node-fetch').then(({ default: fetched }) => {
  fetch = fetched;
  // Ahora puedes usar fetch aquí
});

async function obtenerPrecioActual(symbol) {
  const apiKey = '78EGU8O3NGLYJTC7';
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data["Global Quote"]["05. price"];
  } catch (error) {
    console.error('Error al obtener el precio actual:', error);
  }
}

// create
app.post('/insert', async (request, response) => {
  const { id, nombre, fecha_compra, precio_compra, cantidad, costo_total, cambio, ganancia_perdida } = request.body;
  const db = dbService.getDbServiceInstance();

  try {
    // Obtiene el precio actual antes de insertar
    const precioActual = await obtenerPrecioActual(nombre);
    // const precioActual = 120.0;

    const result = db.insertNewShare({
      id,
      nombre,
      fecha_compra,
      precio_compra,
      cantidad,
      costo_total,
      cambio,
      ganancia_perdida
    }, precioActual);

    response.json({ data: result });
  } catch (error) {
    console.error('Error en insert:', error);
    response.status(500).json({ error: 'Error al insertar la nueva acción.' });
  }
});

// update
app.patch('/update', async (request, response) => {
  const { id, nombre, fecha_compra, precio_compra, cantidad } = request.body;
  const db = dbService.getDbServiceInstance();

  try {
    // Obtiene el precio actual antes de actualizar
    const precioActual = await obtenerPrecioActual(nombre);
    // const precioActual = 120.0;
    const result = db.updateNameById(id, nombre, fecha_compra, precio_compra, cantidad, precioActual);

    response.json({ success: result });
  } catch (error) {
    console.error('Error en update:', error);
    response.status(500).json({ error: 'Error al actualizar la acción.' });
  }
});


// import('node-fetch').then(({ default: fetch }) => {


//   // Ahora puedes usar globalFetch en lugar de fetch
//   async function obtenerPrecioActual(symbol) {
//     const apiKey = '15YYLK7OSX6BMQWI';
//     const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       return data["Global Quote"]["05. price"];
//     } catch (error) {
//       console.error('Error al obtener el precio actual:', error);
//     }
//   }

//   // create
//   app.post('/insert', async (request, response) => {
//     const { id, nombre, fecha_compra, precio_compra, cantidad, costo_total, cambio, ganancia_perdida } = request.body;
//     const db = dbService.getDbServiceInstance();

//     try {
//       // Obtiene el precio actual antes de insertar
//       const precioActual = await obtenerPrecioActual(nombre);

//       const result = await db.insertNewShare({
//         id,
//         nombre,
//         fecha_compra,
//         precio_compra,
//         cantidad,
//         costo_total,
//         cambio,
//         ganancia_perdida
//       }, precioActual);

//       response.json({ data: result });
//     } catch (error) {
//       console.error('Error en insert:', error);
//       response.status(500).json({ error: 'Error al insertar la nueva acción.' });
//     }
//   });

//   // update
//   app.patch('/update', async (request, response) => {
//     const { id, nombre, fecha_compra, precio_compra, cantidad } = request.body;
//     const db = dbService.getDbServiceInstance();

//     try {
//       // Obtiene el precio actual antes de actualizar
//       const precioActual = await obtenerPrecioActual(nombre);

//       const result = await db.updateNameById(id, nombre, fecha_compra, precio_compra, cantidad, precioActual);

//       response.json({ success: result });
//     } catch (error) {
//       console.error('Error en update:', error);
//       response.status(500).json({ error: 'Error al actualizar la acción.' });
//     }
//   });

// });





// read
app.get('/getAll', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();

  result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteRowById(id);

  result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
  const { name } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.searchByName(name);

  result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));
});

app.get('/get-by-id/:id', async (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();

  try {
    const data = await db.getRowById(id);
    response.json(data);
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: 'Error al obtener la fila por ID.' });
  }
});

app.listen(process.env.PORT, () => console.log('app is running'));



