# povlacenje slike
FROM node:8.16.0-alpine
# direktorijum za skladistenje aplikacije
WORKDIR /app

# port kontejnera
EXPOSE 3000

# react projekat
ADD react-kpp /app
# komanda za medjuverziranje
RUN npm run-script build

# pokretanje aplikacije
CMD ["npm", "start"]