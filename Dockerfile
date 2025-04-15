FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install
RUN cd backend && npm install

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000
ENV FRONTEND_URL=https://alexl9111.github.io/imobiliare-online
ENV NODE_OPTIONS=--max-old-space-size=384

# Expose port
EXPOSE 10000

# Start the application
CMD ["node", "backend/server.js"] 