<h1 align="center">
    Escuela Politécnica Nacional<br>
    Facultad de Ingeniería en Sistemas<br>
    Construcción y Evolución de Software<br>
</h1>

### Grupo: 5

### Integrantes
- Ana Campoverde
- Joel Guingla
- Sebastián Sánchez

# Historias de Usuario

---

|**N°:** 1| **Título:** Visualización de porcentaje de cambio de las acciones|
|-|-| 
|**Prioridad**| Media |
|**Historia de usuario:**|**Como** usuario del sistema, **quiero** observar el porcentaje en el que cambian los valores de las acciones **para** identificar si existe ganancia o pérdida|
|**Criterio de aceptación:**|**Dado** que los valores de las acciones son variables **cuando** se registre un cambio se deberá comparar con el valor anterior **entonces** se calculará el porcentaje de cambio de valor de las mismas y se mostrará dicho valor, con signo positivo o negativo para identificar si es ganancia o pérdida|
|||

|**N°:** 2| **Título:** Visualización de ganancia/pérdida basada en el porcentaje de cambio|
|-|-| 
|**Prioridad**| Alta |
|**Historia de usuario:**|**Como** usuario del sistema, **quiero** ver no solo el porcentaje de cambio de las acciones, sino también una indicación clara de si esto representa una ganancia o pérdida **para** tener una interpretación rápida y eficaz de la información|
|**Criterio de aceptación:**|**Dado** que se ha calculado el porcentaje de cambio de valor de las acciones **cuando** este valor se muestre al usuario **entonces** debe incluirse un indicador antes del valor para identificar claramente si el cambio es una ganancia o una pérdida|

|**N°:** 3| **Título:** Ordenación de registro de acciones|
|-|-| 
|**Prioridad**| Alta |
|**Historia de usuario:**|**Como** usuario del sistema, **quiero** poder ordenar el registro de acciones **para** visualizar los datos de manera más eficiente, según mis necesidades|
|**Criterio de aceptación:**|**Dado** que el registro de acciones contiene múltiples entradas **cuando** el usuario seleccione un criterio de ordenación (por ejemplo, nombre de acción, valor actual, porcentaje de cambio) **entonces** el sistema deberá mostrar el registro de acciones ordenado según el criterio seleccionado|

|**N°:** 4| **Título:** Persistencia de datos de acciones|
|-|-| 
|**Prioridad**| Alta |
|**Historia de usuario:**|**Como** usuario del sistema, **quiero** que mis datos de acciones se guarden y persistan **para** no tener que reingresar o perder información sobre cambios pasados|
|**Criterio de aceptación:**|**Dado** que el usuario ha interactuado con el sistema ingresando o actualizando información sobre acciones **cuando** el usuario cierre la sesión y luego regrese **entonces** toda la información previamente ingresada o actualizada deberá estar disponible tal y como se dejó|
