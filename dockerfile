FROM nodered/node-red-docker

WORKDIR /data

COPY ./package.json .
COPY ./src/node-red .
COPY ./src/nodes ./nodes
COPY ./src/static ./static
COPY ./data ./timeseries

WORKDIR /usr/src/node-red

RUN npm install moment
RUN npm install regression
RUN npm install  node-red-dashboard
RUN npm install node-red-node-smooth
