# Primera entrega del proyecto final

Se deberá entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo.

## Aspectos a incluir en el entregable

El router base '/api/productos' implementará cuatro funcionalidades:

- GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores).
- POST: '/' - Para incorporar productos al listado (disponible para administradores).
- PUT: '/:id' - Actualiza un producto por su id (disponible para administradores).
- DELETE: '/:id' - Borra un producto por su id (disponible para administradores).

El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:

- POST: '/' - Crea un carrito y devuelve su id.
- DELETE: '/:id' - Vacía un carrito y lo elimina.
- GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito.
- POST: '/:id/productos/:id_prod' - Para incorporar productos al carrito por su id de producto.
- DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto.

Crear una variable booleana administrador, cuyo valor será configurado más adelante con el sistema de login. Según su valor (true ó false) permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. El status http de la respuesta debe ser 403. Ejemplo:

```json
{ "error": -1, "description": "ruta 'x' método 'y' no autorizada" }
```

Un producto dispondrá de los siguientes campos: id, timestamp, name, descritcion, code, photo (url), price, stock. El carrito de compras tendrá la siguiente estructura: id, timestamp, productos: [id]. El timestamp puede implementarse con Date.now().

Realizar la persistencia de productos y del carrito de compras en el filesystem.

## A tener en cuenta

- Probar con postman cada uno de los endpoints (productos y carrito) y su operación en conjunto.
- En todos los casos, el diálogo entre el frontend y el backend debe ser en formato JSON. El servidor no debe generar ninguna vista.
- En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}, status code: 404.
- La estructura de programación será ECMAScript. Más adelante se implementará el desarrollo en capas.
- Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080).

# Segunda entrega del proyecto final

Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

## Aspectos a incluir en el entregable

- A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.
- En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor.
- Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

# Tercera entrega del proyecto final

Se agregó un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro.

- El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.
- La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url.

## Inicio de sesión

Se agregó un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.

- El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.
- Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.

## Envio de mensajes

Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.

- El usuario iniciará la acción de pedido en la vista del carrito.
- Será enviado una vez finalizada la elección para la realizar la compra de productos.
- El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.
- El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.

## Aspectos a incluir

- El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local.
- Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
- Utilizar algún logger y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados o graves el log tendrá además como destino un archivo elegido.
- Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario logueado). Verificar los resultados.

# Testing

- Desarrollar un cliente HTTP de pruebas que utilice Axios para enviar peticiones, y realizar un test de la funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles, incorporación de nuevos productos, modificación y borrado.
- Realizar el cliente en un módulo independiente y desde un código aparte generar las peticiones correspondientes, revisando los resultados desde la base de datos y en la respuesta del servidor obtenida en el cliente HTTP.
- Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos.
- Escribir una suite de test para verificar si las respuestas a la lectura, incorporación, modificación y borrado de productos son las apropiadas. Generar un reporte con los resultados obtenidos de la salida del test.
