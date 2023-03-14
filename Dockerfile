FROM node:16.3.0-alpine3.11
# where our app will be located in the image
RUN mkdir -p /app
WORKDIR /app
# move all source code
COPY . .
RUN npm install
CMD [ "npm", "run", "eb:prod" ]
EXPOSE 3000