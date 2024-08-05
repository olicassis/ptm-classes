FROM node:20

ENV NODE_ENV development

# Set the main working directory
WORKDIR /src

# Copy root-level files from the parent directory of 'docker'
COPY ../package*.json ./
COPY ../turbo.json ./
COPY ../.env ./

# Copy the packages and services directories while maintaining the directory structure
COPY ../packages/typescript-config packages/typescript-config
COPY ../packages/enum packages/enum
COPY ../packages/db packages/db
COPY ../services/app services/app

# Install root-level dependencies
RUN npm install

# Install dependencies for each package
WORKDIR /src/packages/typescript-config
RUN npm install

WORKDIR /src/packages/enum
RUN npm install

WORKDIR /src/packages/db 
RUN npm install

WORKDIR /src/services/app
RUN npm install

# Expose port 3000
EXPOSE 3000

# Add a basic health check
HEALTHCHECK --interval=1m --timeout=30s --start-period=10s \
    CMD curl --fail http://localhost:3000/api/healthcheck || exit 1

CMD ["npm", "start"]