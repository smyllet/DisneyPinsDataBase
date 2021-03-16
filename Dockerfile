FROM node
COPY ./package.json /home/app/package.json
WORKDIR /home/app/
RUN npm install
COPY ./ /home/app/
CMD [ "node", "app.js"]