FROM node:alpine as build-stage

WORKDIR /app

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=http://flask_app:5000/api/v1/

COPY package.json .
RUN npm install
COPY . .

EXPOSE 8080

RUN npm run build

FROM busybox
RUN adduser -D static
USER static
WORKDIR /home/static
COPY --from=build-stage /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]
