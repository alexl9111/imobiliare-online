FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code
COPY backend/ ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000
ENV FRONTEND_URL=https://alexl9111.github.io/imobiliare-online
ENV NODE_OPTIONS=--max-old-space-size=384
ENV MONGODB_URI=mongodb+srv://alexlupu9111:Farad910711!@cluster0.nkuryft.mongodb.net/imobiliare?retryWrites=true&w=majority
ENV JWT_SECRET=imobiliare_online_2024_secure_key_123!

# Expose port
EXPOSE 10000

# Start the application
CMD ["node", "server.js"] 