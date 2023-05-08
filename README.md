# spotify-ese

* En la carpeta spotify-frontend únicamente ejecutar comando "yarn add" para instalar las dependencias.

* Para el backend hay que realizar ciertas acciones:

  - Crear una base de datos llamada "spotifyese".
  - Usuario y contraseña en base a sus credenciales.

  - Ejecute las migraciones para crear la base.
  - No hay dependencias adicionales.
  - Para poder utilizar el middleware SpotifyCheckToken deberá tener la siguiente configuración:
    1. En su carpeta de php, dentro de extras y ssl, descargue el archivo de la siguiente ruta: https://curl.se/ca/cacert.pem
    2. En el archivo php.ini debe tener habilitada la opción "curl.cainfo" y agregar el path donde tiene descargado el archivo anterior.
       Ejemplo: curl.cainfo = "C:\laragon\bin\php\php-8.2.5-nts-Win32-vs16-x64\extras\ssl\cacert.pem"
    3. Recargar su servidor.

    Se sigue la configuración anterior para poder validar el access token, y por ser un proyeto local, hay problemas al querer ejecutar la función que nos permite efectuar la petición a la API de spotify desde el middleware.