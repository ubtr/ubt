FROM node:18.16.1-alpine3.18 as builder

COPY ./package.json /build/package.json
COPY ./package-lock.json /build/package-lock.json
COPY ./packages/srv-tron /build/packages/srv-tron
COPY ./packages/sdk /build/packages/sdk
WORKDIR /build

RUN npm install -ws
RUN npm run build -ws

FROM node:18.16.1-alpine3.18 as runner

COPY --from=builder /build/package.json /app/package.json
COPY --from=builder /build/package-lock.json /app/package-lock.json
COPY --from=builder /build/packages/sdk/package.json /app/packages/sdk/package.json
COPY --from=builder /build/packages/sdk/dist /app/packages/sdk/dist
COPY --from=builder /build/packages/srv-tron/package.json /app/packages/srv-tron/package.json
COPY --from=builder /build/packages/srv-tron/config /app/packages/srv-tron/config
COPY --from=builder /build/packages/srv-tron/dist /app/packages/srv-tron/dist

WORKDIR /app

RUN npm install --production

WORKDIR /app/packages/srv-tron
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "--experimental-specifier-resolution=node", "dist/server.js"]