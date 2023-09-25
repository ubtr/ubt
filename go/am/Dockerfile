FROM golang:1.21 as build

ADD ./ /app
WORKDIR /app

RUN cd /app/am && GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o /app/am/am

FROM alpine:3.14

RUN apk add --no-cache ca-certificates

COPY --from=build /app/am/am /usr/local/bin/am

ENTRYPOINT ["/usr/local/bin/am"]