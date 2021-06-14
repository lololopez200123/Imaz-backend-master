El sitio está constituido de la siguiente manera:

- El frontend está desarrollado en Vue2 utilizando pug como sistema de maquetado y scss como sistema de estilos, la lógica está implementada en javascript haciendo uso de la infraestructura de Vue. El panel de administración sigue la misma implementación pero utiliza Bulma como sistema de estilado (simil Bootstrap).

- El backend está desarrollado en ExpressJS utilizando NodeJS como soporte, MongoDB como base de datos y Cloudinary para almacenar las imágenes que se suban dinámicamente.

- El frontend se comunica con el backend por medio de una API en JSON y utlizando un token CSRF para validar el origen y un token JWT para las solicitudes con permisos especiales desde el panel de administración.

- El sitio está alojado en un hosting privado de los clientes (dejo abajo acceso SSH). Es una máquina con CentOS donde se corren Apache, Express y MongoDB como servicios para poder ejecutar el sitio. El servicio de Express se ejecuta utilizando PM2.

El servidor se encuentra en WIROOS



URLs:

Sitio web: http://estudioimaz.com.ar/
Panel de administración: http://estudioimaz.com.ar/admin#/

