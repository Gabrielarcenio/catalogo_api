# Usa a imagem oficial do Node.js (versão 18)
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependências para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta 3000 para o contêiner
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
