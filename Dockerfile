FROM ubuntu
COPY . /furniture_web
WORKDIR /furniture_web
RUN apt update
RUN apt install -y npm
RUN npm i
RUN cd backend/
RUN npm i
RUN cd ..
EXPOSE 3000
EXPOSE 5000
CMD ["npm", "run", "both"]

