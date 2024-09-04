# Use a imagem oficial do Node.js
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale todas as dependências
RUN npm install

# Instale o swagger-jsdoc globalmente
RUN npm install -g swagger-jsdoc

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
