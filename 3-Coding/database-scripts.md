# Scripts de Migración de Base de Datos

## Introducción

Este documento contiene los scripts en MySQL utilizados  para las migraciones de la base de datos. Incluye la creación de nuevas tablas, modificaciones a tablas existentes, transferencia de datos y actualización de índices.

## Creación y Modificación de Tablas

```sql
-- Crear una nueva tabla
CREATE TABLE IF NOT EXISTS acciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha_compra DATE NOT NULL,
    precio_compra FLOAT NOT NULL,
    cantidad INT NOT NULL, 	
    costo_total	FLOAT NOT NULL, 	
    cambio DOUBLE NOT NULL, 	
    ganancia_perdida DOUBLE NOT NULL
);

-- Añadir una nueva columna a una tabla existente
ALTER TABLE acciones
ADD columna_nueva VARCHAR(255) DEFAULT 'valor_predeterminado';

-- Modificar el tipo de dato de una columna existente
ALTER TABLE acciones
MODIFY columna_existente NEW_DATATYPE;
```

## Transferencia de Datos
```sql
-- Transferir datos de una tabla antigua a una nueva
INSERT INTO nueva_tabla (columna1, columna2)
SELECT columna_antigua1, columna_antigua2
FROM acciones;
```

## Actualización de Datos

```sql
-- Actualizar datos específicos
UPDATE acciones
SET columna1 = 'nuevo_valor'
WHERE condicion = 'algún_criterio';
```

## Eliminación de Estructuras Antiguas
```sql
-- Eliminar una columna antigua
ALTER TABLE acciones
DROP COLUMN columna_antigua;

-- Eliminar una tabla antigua
DROP TABLE IF EXISTS tabla_antigua;
```
