package main

import (
	"database/sql"
	"encoding/json"
	"fmt"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	_ "github.com/go-sql-driver/mysql"
	"github.com/rchau73/eda-challenge/consumer/internal/database"
	findbyid_balance "github.com/rchau73/eda-challenge/consumer/internal/usecase/FindByID_balance"
	"github.com/rchau73/eda-challenge/consumer/internal/usecase/save_balance"
	"github.com/rchau73/eda-challenge/consumer/internal/web"
	"github.com/rchau73/eda-challenge/consumer/internal/web/webserver"
	"github.com/rchau73/eda-challenge/consumer/pkg/kafka"
)

func main() {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", "root", "root", "mysql", "3306", "wallet"))
	if err != nil {
		panic(err)
	}
	defer db.Close()

	configMap := ckafka.ConfigMap{
		"bootstrap.servers": "kafka:29092",
		"group.id":          "wallet",
		"auto.offset.reset": "earliest",
	}

	findByIDBalanceUseCase := findbyid_balance.NewFindByIDBalanceUseCase(database.NewBalanceDB(db))
	saveBalanceUseCase := save_balance.NewSaveBalanceUseCase(database.NewBalanceDB(db))

	topics := []string{"balances"}
	kafkaConsumer := kafka.NewKafkaConsumer(&configMap, topics)

	consumerMsg := make(chan *ckafka.Message)

	go kafkaConsumer.Consume(consumerMsg)

	consumerFunc := func(msgChan chan *ckafka.Message, saveBalanceUseCase *save_balance.SaveBalanceUseCase) {
		for {
			fmt.Println("Waiting for messages from kafka...")
			msg := <-msgChan
			kafkaMsg := KafkaMsgDto{}
			err := json.Unmarshal(msg.Value, &kafkaMsg)
			kafkaPayload := kafkaMsg.Payload
			if err != nil {
				fmt.Println(err.Error())
			}
			input := save_balance.SaveBalanceInputDTO{
				AccountID: kafkaPayload.AccountIDFrom,
				Balance:   float64(kafkaPayload.BalanceAccountIDFrom),
			}
			_, err = saveBalanceUseCase.Execute(input)
			if err != nil {
				fmt.Println(err.Error())
			}
			input = save_balance.SaveBalanceInputDTO{
				AccountID: kafkaPayload.AccountIDTo,
				Balance:   float64(kafkaPayload.BalanceAccountIDTo),
			}
			_, err = saveBalanceUseCase.Execute(input)
			if err != nil {
				fmt.Println(err.Error())
			}
		}
	}

	go consumerFunc(consumerMsg, saveBalanceUseCase)

	webserver := webserver.NewWebServer(":3003")
	getBalanceHandler := web.NewWebGetBalancerHandler(*findByIDBalanceUseCase)
	webserver.AddHandler("/balances", getBalanceHandler.FindByIDBalance)
	fmt.Println("Balances Server is running")
	webserver.Start()
}

type PayloadKafkaDto struct {
	AccountIDFrom        string  `json:"account_id_from"`
	BalanceAccountIDFrom float64 `json:"balance_account_id_from"`
	AccountIDTo          string  `json:"account_id_to"`
	BalanceAccountIDTo   float64 `json:"balance_account_id_to"`
}

type KafkaMsgDto struct {
	Name    string
	Payload PayloadKafkaDto
}

func (kafkaPayload *PayloadKafkaDto) String() string {
	return fmt.Sprintf("AccountIDFrom: %s, BalanceAccountIDFrom: %f, AccountIDTo: %s, BalanceAccountIDTo: %f", kafkaPayload.AccountIDFrom, kafkaPayload.BalanceAccountIDFrom, kafkaPayload.AccountIDTo, kafkaPayload.BalanceAccountIDTo)
}
