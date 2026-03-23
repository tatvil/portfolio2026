# Usar Nginx como servidor web
FROM nginx:alpine

# Copiar los archivos de tu web al contenedor
COPY . /usr/share/nginx/html/

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]