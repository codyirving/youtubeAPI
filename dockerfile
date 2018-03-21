FROM nginx:alpine
COPY nginx.conf nginx.conf
COPY . /usr/share/nginx/html