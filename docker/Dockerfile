FROM node:22-alpine AS build

WORKDIR /app/

COPY package*.json /app/

RUN npm ci

COPY . /app/

RUN npm run build

FROM nginx:1.26-alpine AS run

RUN apk --no-cache add shadow npm git vim

RUN usermod -u 1001 nginx

#RUN npm i -g @beam-australia/react-env

COPY --chown=nginx --from=build /app/dist/ /usr/share/nginx/html

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chown -R nginx:nginx /usr/share/nginx/html

RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 3000

HEALTHCHECK CMD curl -f http://127.0.0.1:3000 || exit 1

ENTRYPOINT ["/entrypoint.sh"]
