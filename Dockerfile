FROM node:10.9.0

ENV PORT=6000 
ENV MONGODB_URI=mongodb://hssi-db:27017/activity 
ENV DEBUG=notes:*
 
RUN mkdir -p /activity

COPY package.json *.js /activity/
COPY controllers/ /activity/controllers/
COPY models/ /activity/models/
COPY db/ /activity/db/
COPY routes/ /activity/routes/

WORKDIR /activity

RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list

RUN apt-get update -y  \
    && apt-get -y install curl python build-essential git ca-certificates  \
    && npm install --unsafe-perm
 
EXPOSE 6000 

CMD npm run docker 
