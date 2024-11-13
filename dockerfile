# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Establece la variable de entorno
ENV NEXT_PUBLIC_API_URL=http://localhost:3000/api
ENV NEXT_PUBLIC_API_URL_BACK_AUTH=http://host.docker.internal:8080
ENV NEXT_PUBLIC_API_URL_BACK_HOTELS=http://host.docker.internal:8088
ENV NEXT_PUBLIC_USER=20

# Construye la aplicación
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]
