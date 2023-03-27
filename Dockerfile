FROM node:16.16.0

COPY . /furniture_web
WORKDIR /furniture_web

RUN apt-get update && apt-get install -y \
  vim \
  && rm -rf /var/lib/apt/lists/*

RUN cd backend && npm install
RUN npm install

EXPOSE 3000
EXPOSE 5000

CMD ["npm", "run", "both"]

