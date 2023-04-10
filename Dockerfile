FROM node:12 as build-stage
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ .
RUN npm run build

FROM nginx as vkr_frontend
RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf
