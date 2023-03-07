FROM ubuntu
WORKDIR /furniture_web

COPY . .
RUN apt update
RUN apt install -y npm
RUN npm i
RUN cd backend/
RUN npm i
RUN cd ..
RUN npm uninstall nodemon
RUN npm install nodemon --save-dev
EXPOSE 3000
CMD ["npm", "run", "both"]

