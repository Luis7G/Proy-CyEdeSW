# [CP-1] : Verificar el registro correcto de una acción

## Descripción

Verificar que el sistema permite registrar una acción con todos los campos requeridos: nombre de la acción, fecha de compra, precio de la acción, cantidad de acciones, y precio total. Además, se debe verificar que el sistema calcula automáticamente el cambio en el valor de las acciones en unidades porcentuales, y la ganancia o pérdida generada por este cambio.

## Pasos de la prueba

1. Acceder al módulo de registro de acciones del sistema.
2. Introducir un nombre válido para la acción.
3. Seleccionar una fecha de compra.
4. Introducir un valor válido para el precio de la acción.
5. Indicar la cantidad de acciones compradas.
6. Verificar que el sistema calcula el precio total automáticamente.
7. Confirmar el registro de la acción.

## Resultado esperado

La acción se registra correctamente en el sistema con todos los datos introducidos. Además, el sistema muestra el cambio en el valor de las acciones en unidades porcentuales y la ganancia o pérdida generada, inicialmente establecida en 0% y $0 respectivamente, dado que no hay un cambio de valor registrado inmediatamente después de la compra.

# [CP-2] : Editar una acción registrada

## Descripción

Este caso de prueba verifica la funcionalidad de editar una acción ya registrada, permitiendo modificar cualquier campo excepto el cálculo automático del cambio en valor y ganancia/pérdida, que el sistema ajustará en base a los nuevos datos ingresados.

## Pasos de la prueba

1. Acceder al listado de acciones registradas en el sistema.
2. Seleccionar una acción para editar.
3. Modificar uno o varios campos: nombre de la acción, fecha de compra, precio de la acción, o cantidad de acciones.
4. Confirmar los cambios realizados.

## Resultado esperado

El sistema actualiza la información de la acción con los cambios realizados. El cálculo del cambio en el valor de las acciones en unidades porcentuales y la ganancia o pérdida se ajusta automáticamente en base a los nuevos datos.

# [CP-3] : Eliminar una acción registrada

## Descripción

Este caso de prueba verifica que el sistema permite eliminar una acción previamente registrada.

## Pasos de la prueba

1. Acceder al listado de acciones registradas en el sistema.
2. Seleccionar una acción para eliminar.
3. Confirmar la eliminación de la acción.

## Resultado esperado

La acción seleccionada se elimina correctamente del sistema y ya no aparece en el listado de acciones registradas.

# [CP-4] : Ordenar las acciones registradas

## Descripción

Verificar que el sistema permite ordenar las acciones registradas por cualquiera de los campos disponibles: nombre de la acción, fecha de compra, precio de la acción, cantidad de acciones, y precio total.

## Pasos de la prueba

1. Acceder al listado de acciones registradas en el sistema.
2. Seleccionar un encabezado para ordenar de forma ASC o DESC.
3. Verificar que el listado se actualiza mostrando las acciones ordenadas según el criterio seleccionado.

## Resultado esperado

Las acciones se muestran ordenadas en el sistema de acuerdo al criterio de ordenamiento seleccionado, verificando así la funcionalidad de ordenamiento.
