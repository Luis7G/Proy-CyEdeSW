const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// create
app.post('/insert', (request, response) => {
    const { id, nombre, fecha_compra, precio_compra, cantidad, costo_total } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewShare({
      id,
      nombre,
      fecha_compra,
      precio_compra,
      cantidad,
      costo_total
    });
  
    result
      .then(data => response.json({ data: data }))
      .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

//update
app.patch('/update', (request, response) => {
    const { id, nombre, fecha_compra, precio_compra, cantidad } = request.body;
    const db = dbService.getDbServiceInstance();
  
    const result = db.updateNameById(id, nombre, fecha_compra, precio_compra, cantidad);
  
    result
      .then(data => response.json({success: data}))
      .catch(err => console.log(err));
  });

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
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