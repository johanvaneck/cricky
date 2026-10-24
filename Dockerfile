FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && mkdir -p .output && cp -r dist/server .output/server && cp -r dist/client .output/public
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production DATA_DIR=/data PORT=3000
COPY --from=build /app /app
RUN mkdir -p /data && chown -R node:node /app /data
USER node
EXPOSE 3000
CMD ["npm","run","start"]
