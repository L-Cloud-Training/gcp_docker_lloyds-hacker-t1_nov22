# 1. pick a node 11.13.0-alpine image
FROM node:11.13.0-alpine
# 2. create destination directory
RUN mkdir -p /app
WORKDIR /app
# 3. update and install dependency
RUN apk update && apk upgrade
RUN apk add git
# 4. copy the app into the work directory and install packages needed for NodeJS
ADD . /app
RUN npm install
# 5. build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build
# 6. expose the port on container
EXPOSE 5000
# 7. set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# 8. set app port
ENV NUXT_PORT=5000
# 9. start the app
CMD [ "npm", "start" ]