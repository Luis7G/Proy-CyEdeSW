# Actualización del Esquema de Base de Datos

## Introducción

Este documento detalla los cambios aplicados al esquema de la base de datos para incorporar las nuevas funcionalidades de cálculo y visualización de ganancias y pérdidas, así como el porcentaje de cambio en el valor de las acciones.

## Cambios en el Esquema de Base de Datos
A continuación, se detallan los scripts SQL utilizados para actualizar el esquema de base de datos:

```sql
-- Añadir columnas de cálculo al esquema de la tabla
ALTER TABLE acciones
ADD cambio DECIMAL(5,2) NOT NULL,
ADD ganancia_perdida DECIMAL(10,2) NOT NULL;
```

## Lógica de Cálculo

### Cálculo de Cambio

El porcentaje de cambio se calcula con la siguiente fórmula y se almacena en la columna `cambio`:

```plaintext
cambio = (((precioActual - precio_compra) / precio_compra) * 100)
```
- precioActual: Es el precio actual de la acción obtenido a través del servicio de cotizaciones.
- precio_compra: Es el precio de compra de la acción registrado por el usuario.

### Cálculo de Ganancia/Perdida
La ganancia o pérdida se calcula utilizando la fórmula siguiente y se almacena en la columna ganancia_perdida:

```plaintext
ganancia_perdida = costo_total + (costo_total * cambio / 100)
```
- costo_total: Es el costo total de compra de las acciones, calculado como el producto del precio de compra por la cantidad de acciones.
- cambio: Es el porcentaje de cambio calculado anteriormente.

### Implementación en el Backend
Los cálculos se realizan dentro de las funciones correspondientes en el código del backend cada vez que se registra una nueva acción o se actualiza una existente. A continuación se muestra un ejemplo de cómo estos cálculos están integrados en el código:

```javascript
// Función para insertar una nueva acción
async function insertNewShare(data, precioActual) {
    // ... código anterior omitido para brevedad
    const cambio = (((precioActual - data.precio_compra) / data.precio_compra) * 100).toFixed(2);
    const ganancia_perdida = (data.costo_total + (data.costo_total * cambio / 100)).toFixed(2);
    // ... código posterior omitido para brevedad
}
```