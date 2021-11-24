FROM node:14
WORKDIR /code
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start", "-s"]
