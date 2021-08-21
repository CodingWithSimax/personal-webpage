FROM node:latest
WORKDIR ..
RUN git pull --rebase --autostash
RUN npm install
CMD ["npm", "start"]