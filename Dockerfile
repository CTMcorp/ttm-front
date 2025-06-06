FROM node:22 AS build
WORKDIR /app
# bonne pratique copy package.json au debut pour pas qu'il se refasse sauf si new dependences.
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

