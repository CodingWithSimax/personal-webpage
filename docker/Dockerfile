FROM node:latest
WORKDIR ..
RUN pwd
RUN git pull --rebase --autostash
RUN npm install
CMD ["npm", "start"]