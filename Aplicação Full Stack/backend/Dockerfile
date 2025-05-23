# Usa imagem oficial do Node.js
FROM node:18

# Cria diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências primeiro
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta que o app escuta
EXPOSE 5000

# Comando de inicialização
CMD ["node", "index.js"]

