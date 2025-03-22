#!/usr/bin/env sh

#react-env --dest /usr/share/nginx/html

nginx -g "daemon off;"

exec "$@"
