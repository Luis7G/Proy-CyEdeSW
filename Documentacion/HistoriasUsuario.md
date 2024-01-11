# Construcción y Evolución de Software
## Escuela Politécnica Nacional - Facultad de Ingeniería en Sistemas

### Historias de Usuario
**Estudiantes:**  
- Ana Campoverde
- Joel Guingla
- Sebastián Sánchez

En el presente informe, se exponen las variadas historias de usuario asociadas con el desarrollo del proyecto de un sistema de registro de acciones. Estas historias exploran los elementos fundamentales del proyecto desde la perspectiva del usuario, considerando tanto los criterios de aceptación como los requisitos esenciales para llevar a cabo las historias.

| Nro: 1 | Solicitud: Registro de nuevas acciones | Prioridad: Alta |
|--------|----------------------------------------|------------------|
| **Historia de Usuario:** Como usuario del sistema, deseo poder registrar nuevas acciones de manera eficiente, proporcionando información clave como el nombre de la acción, fecha de compra, precio por acción, cantidad de acciones y costo total de compra. Esto permitirá mantener un historial detallado y actualizado de mis inversiones. |
| **Criterio de Aceptación:** Dado que el usuario tiene acceso al sistema, cuando complete todos los campos requeridos para registrar una nueva acción, la acción deberá ser almacenada de manera efectiva en la base de datos. El sistema deberá proporcionar un formulario de registro con campos para el nombre de la acción, fecha de compra, precio por acción, cantidad de acciones y costo total de compra. Se requiere un mecanismo de cálculo automático del costo total de la compra. El historial de acciones deberá ser accesible para que el usuario pueda verificar la información registrada. |

| Nro: 2 | Solicitud: Visualización detallada del historial de acciones | Prioridad: Media |
|--------|-------------------------------------------------------------|-------------------|
| **Historia de Usuario:** Como usuario del sistema, quiero poder visualizar un historial detallado de todas las acciones registradas. Esto me permitirá realizar un seguimiento efectivo de mis transacciones pasadas y tomar decisiones informadas sobre nuevas inversiones. |
| **Criterio de Aceptación:** Dado que el usuario tiene acceso al sistema, cuando acceda a la función de visualización de historial, deberá ver una lista completa y detallada de todas las acciones registradas. El sistema debe proporcionar una interfaz clara y accesible para visualizar el historial de acciones. La información en el historial debe presentarse de manera ordenada y fácil de entender. |

| Nro: 3 | Solicitud: Modificación de una acción registrada | Prioridad: Media |
|--------|-------------------------------------------------|-------------------|
| **Historia de Usuario:** Como usuario del sistema, quiero tener la capacidad de modificar los detalles de una acción registrada. Esto me permitirá corregir errores en la información ingresada o actualizar datos en caso de cambios en la posición de la acción. |
| **Criterio de Aceptación:** Dado que el usuario tiene acceso al sistema, cuando acceda a la función de modificación de acciones y seleccione una acción específica, deberá poder editar los detalles de esa acción. Después de realizar cambios, la acción modificada deberá reflejar la información actualizada en el historial. El sistema debe proporcionar una interfaz intuitiva para editar los detalles de una acción registrada. Los cambios realizados en la información de la acción deben reflejarse inmediatamente en el historial. |

| Nro: 4 | Solicitud: Eliminación de una Acción Registrada | Prioridad: Baja |
|--------|-----------------------------------------------|------------------|
| **Historia de Usuario:** Como usuario del sistema, deseo poder eliminar una acción registrada que ya no es relevante. Esto me permitirá mantener mi historial actualizado y libre de información obsoleta. |
| **Criterio de Aceptación:** Dado que el usuario tiene acceso al sistema, cuando acceda a la función de eliminación de acciones y seleccione una acción específica, deberá poder confirmar la eliminación. Después de la eliminación, la acción ya no deberá aparecer en el historial de acciones. |
| **Requisitos No Funcionales Asociados:** El sistema debe proporcionar una opción clara para eliminar acciones. Se debe solicitar una confirmación antes de completar la eliminación. |

| Nro: 5 | Solicitud: Seguridad de Datos | Prioridad: Media |
|--------|-----------------------------|-------------------|
| **Historia de Usuario:** Como usuario preocupado por la seguridad de mis datos financieros, deseo que el sistema implemente medidas de seguridad robustas para proteger la información sensible relacionada con mis inversiones. |
| **Criterio de Aceptación:** Los datos almacenados en el sistema deben estar cifrados para proteger la confidencialidad. El sistema debe implementar autenticación segura para garantizar que solo usuarios autorizados accedan a la información financiera. |

| Nro: 6 | Solicitud: Rendimiento y Eficiencia | Prioridad: Alta |
|--------|--------------------------------------|------------------|
| **Historia de Usuario:** Como usuario que valora la eficiencia, deseo que el sistema sea rápido y eficiente al cargar y mostrar el historial de acciones, incluso cuando haya un gran volumen de datos. |
| **Criterio de Aceptación:** El tiempo de carga del historial de acciones no debe exceder un límite aceptable, incluso con una cantidad significativa de registros. Las operaciones como registro, modificación y eliminación de acciones deben completarse de manera rápida y sin demoras notables. |

| Nro: 8 | Solicitud: Interfaz de Usuario Intuitiva | Prioridad: Alta |
|--------|--------------------------------------------|------------------|
| **Historia de Usuario:** Como usuario, deseo que la interfaz de usuario sea intuitiva y fácil de usar, para poder navegar y realizar acciones en el sistema de Registro de Acciones sin dificultades. |
| **Criterio de Aceptación:** La interfaz de usuario debe tener un diseño limpio y organizado. Las funciones clave, como registro, modificación, eliminación y búsqueda, deben ser fácilmente accesibles y comprensibles para cualquier usuario. |

