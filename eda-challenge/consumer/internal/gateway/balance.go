package gateway

import "github.com/rchau73/eda-challenge/consumer/internal/entity"

type BalanceGateway interface {
	Save(balance *entity.Balance) error
	FindByID(id string) (*entity.Balance, error)
	UpdateBalance(balance *entity.Balance) error
}
