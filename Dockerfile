FROM node:latest
RUN git pull --rebase --autostash
RUN npm install
CMD ["npm", "start"]