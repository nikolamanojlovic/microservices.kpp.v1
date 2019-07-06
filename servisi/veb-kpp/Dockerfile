# povlacenje slike
FROM node:8.16.0-alpine
WORKDIR /app

EXPOSE 3000
ADD react-kpp /app
RUN npm run-script build

CMD ["npm", "start"]