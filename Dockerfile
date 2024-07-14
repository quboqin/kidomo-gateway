FROM node:20.15.0
RUN npm install -g npm@10.7.0
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
ADD . /var/www/gateway
RUN apt-get update \
    && apt-get install -y openssh-server \
    && mkdir -p /var/run/sshd
EXPOSE 22
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN npm install
CMD npm run build && npm run start:prod
ENTRYPOINT ["docker-entrypoint.sh"]
