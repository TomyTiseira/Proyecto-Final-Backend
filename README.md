# Proyecto final

Se desarrollo el backend de una aplicación de e-commerce para poder vender productos de un rubro a elección.

## Aspectos a incluir

- Contendrá las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, así como interactuar con el carrito de compras.
- Se implementará una API RESTful con los verbos get, post, put y delete para cumplir con todas las acciones necesarias.
- Debe brindar al frontend un mecanismo de ingreso autorizado al sistema basado en JWT (Json Web Token). 
- Los productos ingresados se almacenarán en una base de datos MongoDB. 
- El usuario podrá registrar sus credenciales de acceso (email y password) para luego poder ingresar a su cuenta. Estas credenciales serán guardadas en la base de datos MongoDB encriptando la contraseña.
- El cliente tendrá una sesión activa de usuario con tiempo de expiración configurable.
- Implementarás un canal de chat basado en websockets, el cual permita atender las consultas del cliente.
- La arquitectura del servidor estará basada en capas (MVC)
- El servidor podrá tomar configuraciones desde un archivo externo.
- Dispondrá de una vista creada con handlebars, que permita ver la configuración del servidor.
- Se enviará un mail a una casilla configurable, por cada registro nuevo de usuario y con cada orden de compra generada.
- En caso de detectar algún error, el servidor enviará una vista implementada con ejs, que contenga el id y el detalle completo.

## Requisitos base

Rereferente al apartado de inicio:

- Permitir un menú de ingreso al sistema con email y password así como también la posibilidad de registro de un nuevo usuario.
- El menú de registro consta del nombre completo del cliente, número telefónico, email y campo de password duplicado para verificar coincidencia.
- Si un usuario se loguea exitosamente o está en sesión activa, la ruta ‘/’ hará una re dirección a la ruta del carrito /productos.
- La ruta /productos devolverá el listado de todos los productos disponibles para la compra.
- La ruta /productos/:categoria devolverá los productos por la categoría requerida.
- Los ítems podrán ser agregados al carrito de compras y listados a través de la ruta /carrito.
- Se podrán modificar y borrar por su id a través de la ruta /carrito:id.
- Se puede solicitar un producto específico con la ruta /productos/:id, donde id es el id del item generado por MongoDB y devolver la descripción del producto ( foto, precio, selector de cantidad). 
- Si se ingresa a /productos/:id y el producto no existe en MongoDB, debemos responder un mensaje adecuado que indique algo relacionado a que el producto no existe.

Rerefente a la implementación de colecciones en mongoDb:

- Usuarios: clientes registrados
- Productos: catálogo completo, incluye: link para foto, precio, descripción, categoria.
- Mensaje: incluye, email del usuario, tipo, fecha y hora y cuerpo del mensaje.
- Carrito: email, fecha y hora, items, dirección de entrega.
- Ordenes: items, numero de orden, fecha y hora, estado y email.


Finalizada la orden, enviar un mail a la dirección de mi cuenta con los detalles de la orden.


Se dispondrá de un archivo de configuración externo con opciones para desarrollo y otras para producción, que serán visualizadas a través de una vista construida con handlebars. Como parámetros de configuración estará el puerto de escucha del servidor, la url de la base de datos, el mail que recibirá notificaciones del backend, tiempo de expiración de sesión y los que sea necesario incluir.

Vamos a contar con un canal de chat general donde el usuario enviará los mensajes en la ruta /chat y en /chat/:email podrá ver sólo los suyos. Se utilizará la colección mensajes en MongoDB.  La tecnología de comunicación a utilizar será Websockets. El servidor implementará una vista, utilizando handlebars, para visualizar todos los mensajes y poder responder individualmente a ellos, eligiendo el email de respuesta.