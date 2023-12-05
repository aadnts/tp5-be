FROM node:18 as build
WORKDIR /home/ant/ntic/antonio_dantas_TP5/tp5-be
COPY package.json .
# COPY package-lock.json . yarn.lock ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-slim
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /home/ant/ntic/antonio_dantas_TP5/tp5-be
COPY --chown=node:node --from=build /home/ant/ntic/antonio_dantas_TP5/tp5-be/dist ./dist
COPY --chown=node:node --from=build /home/ant/ntic/antonio_dantas_TP5/tp5-be/.env .env
COPY --chown=node:node --from=build /home/ant/ntic/antonio_dantas_TP5/tp5-be/package.json .
# COPY --chown=node:node --from=build /usr/src/app/package-lock.json .
RUN npm install --omit=dev
COPY --chown=node:node --from=build /home/ant/ntic/antonio_dantas_TP5/tp5-be/node_modules/.prisma/client  ./node_modules/.prisma/client

ENV NODE_ENV production
EXPOSE 3777
CMD ["dumb-init", "node", "dist/main"]