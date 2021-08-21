FROM node:latest
WORKDIR /usr/src/personal-webpage
RUN git clone https://github.com/CodingWithSimax/personal-webpage.git .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]