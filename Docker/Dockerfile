FROM alpinelinux/golang as builder
WORKDIR /app
COPY Fullcycle.go .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o Fullcycle Fullcycle.go 

FROM scratch
WORKDIR /app
COPY --from=builder /app/Fullcycle .
CMD ["./Fullcycle"]