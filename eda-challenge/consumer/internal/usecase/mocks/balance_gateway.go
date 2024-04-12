package mocks

import (
	"github.com/rchau73/eda-challenge/consumer/internal/entity"
	"github.com/stretchr/testify/mock"
)

type BalanceGatewayMock struct {
	mock.Mock
}

func (m *BalanceGatewayMock) Save(balance *entity.Balance) error {
	args := m.Called(balance)
	return args.Error(0)
}

func (m *BalanceGatewayMock) FindByID(id string) (*entity.Balance, error) {
	args := m.Called(id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	} else {
		return args.Get(0).(*entity.Balance), args.Error(1)
	}
}

func (m *BalanceGatewayMock) UpdateBalance(balance *entity.Balance) error {
	args := m.Called(balance)
	return args.Error(0)
}
