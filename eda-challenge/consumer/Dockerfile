FROM golang:1.20

WORKDIR /app/consumer

RUN apt-get update && apt-get install -y librdkafka-dev

COPY . .

RUN go mod tidy

CMD ["go", "run", "./cmd/balances/main.go"]
#CMD ["tail", "-f", "/dev/null"]