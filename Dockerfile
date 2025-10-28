# 🧩 Base image
FROM node:20-alpine

# 🏗️ Working directory
WORKDIR /app

# 📦 Copy package files
COPY package*.json ./

# 🔧 Install all dependencies (including dev for nodemon in dev mode)
RUN npm install

# 📂 Copy all source code
COPY . .

# 🌍 Expose app port
EXPOSE 5000

# 🚀 Default command (overridden by docker-compose)
CMD ["npm", "run", "dev"]
