FROM golang:1.20

WORKDIR /app/goapp

RUN apt-get update && apt-get install -y librdkafka-dev

COPY . .

RUN go mod tidy

CMD ["go", "run", "./cmd/walletcore/main.go"]
#CMD ["tail", "-f", "/dev/null"]