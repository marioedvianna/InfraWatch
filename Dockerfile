# Usa uma imagem leve do Node.js
FROM node:20-slim

# Cria o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./

# Instala apenas as dependências necessárias para produção
RUN npm install --only=production

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que a API usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/index.js"]