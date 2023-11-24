# Stage 1: Install all dependencies and run tests
FROM node:latest as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn test:e2e


# Stage 2: Build the production image
FROM node:latest as production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Run the Application
CMD ["npm", "run", "start:prod"]


