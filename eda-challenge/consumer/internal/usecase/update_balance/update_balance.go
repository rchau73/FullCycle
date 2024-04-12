package update_balance

import (
	"github.com/rchau73/eda-challenge/consumer/internal/entity"
	"github.com/rchau73/eda-challenge/consumer/internal/gateway"
)

type UpdateBalanceInputDTO struct {
	AccountID string  `json:"account_id"`
	Balance   float64 `json:"balance"`
}

type UpdateBalanceOutputDTO struct {
	ID string
}

type UpdateBalanceUseCase struct {
	BalanceGateway gateway.BalanceGateway
}

func NewUpdateBalanceUseCase(b gateway.BalanceGateway) *UpdateBalanceUseCase {
	return &UpdateBalanceUseCase{
		BalanceGateway: b,
	}
}

func (uc *UpdateBalanceUseCase) Execute(input UpdateBalanceInputDTO) (*UpdateBalanceOutputDTO, error) {
	balance, err := entity.NewBalance(input.AccountID, input.Balance)
	if err != nil {
		return nil, err
	}

	err = uc.BalanceGateway.UpdateBalance(balance)
	if err != nil {
		return nil, err
	}
	output := &UpdateBalanceOutputDTO{
		ID: balance.ID,
	}
	return output, nil
}
