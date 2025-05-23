FROM node:18

# Criação de usuário e grupo (executed as root)
RUN groupadd -r appgroup && useradd -m -r -g appgroup appuser

# Definir o diretório de trabalho (executed as root)
WORKDIR /app

# Copy package.json and install dependencies as root (to avoid permission issues during install)
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
# This copies source files, which are now owned by root by default after the copy.
# We will change ownership of the entire /app directory later.
COPY . .

# Change ownership of the entire /app directory (including node_modules) to appuser
# This is crucial for enabling write permissions for appuser where needed (e.g., .cache)
RUN chown -R appuser:appgroup /app

# Mudar para o usuário não-root
USER appuser

EXPOSE 3000
CMD ["npm", "start"]