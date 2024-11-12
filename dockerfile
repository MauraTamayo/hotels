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

# Construye la aplicación
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]
