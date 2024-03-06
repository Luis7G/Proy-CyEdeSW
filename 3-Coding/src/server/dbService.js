const mysql = require('mysql');
const dotenv = require('dotenv');

let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});




class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT id, nombre, fecha_compra, precio_compra, cantidad, costo_total, cambio, ganancia_perdida FROM acciones;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // async insertNewShare(data) {
  //   try {
  //     const costo_total = data.precio_compra * data.cantidad;
  //     const query = "INSERT INTO acciones (id, nombre, fecha_compra, precio_compra, cantidad, costo_total) VALUES (?, ?, ?, ?, ?, ?);";
  //     const insertId = await new Promise((resolve, reject) => {
  //       connection.query(query, [data.id, data.nombre, data.fecha_compra, data.precio_compra, data.cantidad, costo_total], (err, result) => {
  //         if (err) reject(new Error(err.message));
  //         resolve(result.insertId);
  //       });
  //     });
  //     return {
  //       id: insertId,
  //       nombre: data.nombre,
  //       fecha_compra: data.fecha_compra,
  //       precio_compra: data.precio_compra,
  //       cantidad: data.cantidad,
  //       costo_total: costo_total
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async insertNewShare(data, precioActual) {
    try {
      console.log(`Precio actual de la acción: ${precioActual}`); // Imprime el precio actual
      const costo_total = data.precio_compra * data.cantidad;
      // Calcula cambio y ganancia_perdida
      const cambio = (((precioActual - data.precio_compra) / data.precio_compra) * 100).toFixed(2);

      // const ganancia_perdida = (precioActual * data.cantidad) - costo_total;
      const ganancia_perdida = (costo_total + (costo_total * cambio / 100)).toFixed(2);
      // const ganancia_perdida = (precioActual * data.cantidad) - (data.precio_compra * data.cantidad);

      const nombreEnMayusculas = data.nombre.toUpperCase();

      // Asume que has agregado las columnas cambio y ganancia_perdida a tu tabla acciones
      const query = "INSERT INTO acciones (id, nombre, fecha_compra, precio_compra, cantidad, costo_total, cambio, ganancia_perdida) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
      const insertId = await new Promise((resolve, reject) => {
        connection.query(query, [data.id, nombreEnMayusculas, data.fecha_compra, data.precio_compra, data.cantidad, costo_total, cambio, ganancia_perdida], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      return {
        id: insertId,
        nombre: nombreEnMayusculas,
        fecha_compra: data.fecha_compra,
        precio_compra: data.precio_compra,
        cantidad: data.cantidad,
        costo_total: costo_total,
        cambio: cambio,
        ganancia_perdida: ganancia_perdida
      };
    } catch (error) {
      console.log(error);
    }
  }


  async deleteRowById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM acciones WHERE id = ?";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        })
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // async updateNameById(id, nombre, fecha_compra, precio_compra, cantidad, precioActual) {
  //   try {
  //     id = parseInt(id, 10);
  //     if (isNaN(id) || id <= 0) {
  //       return false;
  //     }
  //     const cambio = (((precioActual - precio_compra) / precio_compra) * 100).toFixed(2);
  //     const costo_total = precio_compra * cantidad;
  //     const ganancia_perdida = (costo_total * cambio / 100);

  //     const response = await new Promise((resolve, reject) => {
  //       const query = "UPDATE acciones SET nombre = ?, fecha_compra = ?, precio_compra = ?, cantidad = ?, costo_total = ?, cambio = ?, ganacia_perdida = ?  WHERE id = ?";

  //       connection.query(query, [nombre, fecha_compra, precio_compra, cantidad, costo_total, cambio, ganancia_perdida, id], (err, result) => {
  //         if (err) reject(new Error(err.message));
  //         resolve(result.affectedRows);
  //       });
  //     });

  //     return response > 0 ? true : false;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }


  async updateNameById(id, nombre, fecha_compra, precio_compra, cantidad, precioActual) {
    try {
      id = parseInt(id, 10);
      if (isNaN(id) || id <= 0) {
        return false;
      }
      console.log(`Precio actual de la acción: ${precioActual}`); // Imprime el precio actual


      // Convierte el nombre a mayúsculas antes de la actualización
      const nombreEnMayusculas = nombre.toUpperCase();

      // Realiza el cálculo del cambio y otras operaciones necesarias aquí
      const cambio = (((precioActual - precio_compra) / precio_compra) * 100).toFixed(2);
      const costo_total = precio_compra * cantidad;
      const ganancia_perdida = (costo_total + (costo_total * cambio / 100)).toFixed(2);

      // Realiza la actualización en la base de datos
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE acciones SET nombre = ?, fecha_compra = ?, precio_compra = ?, cantidad = ?, costo_total = ?, cambio = ?, ganancia_perdida = ? WHERE id = ?";

        connection.query(query, [nombreEnMayusculas, fecha_compra, precio_compra, cantidad, costo_total, cambio, ganancia_perdida, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows); // Devuelve el número de filas afectadas
        });
      });

      // Devuelve true si se actualizó correctamente
      return response > 0 ? true : false;
    } catch (error) {
      // Maneja los errores adecuadamente
      console.error('Error en updateNameById:', error);
      return false;
    }
  }


  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM acciones WHERE nombre = ?;";

        connection.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        })
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getRowById(id) {
    try {
      id = parseInt(id, 10);
      const query = "SELECT * FROM acciones WHERE id = ?";
      const response = await new Promise((resolve, reject) => {
        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]); // Devuelve solo la primera fila
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }


}

module.exports = DbService;