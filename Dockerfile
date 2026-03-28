# Usamos la imagen oficial de Nginx, la versión estable y ligera
FROM nginx:stable-alpine

# Borramos la web por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos tus archivos (html, js, css) a la carpeta de Nginx
COPY . /usr/share/nginx/html/

# Exponemos el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
