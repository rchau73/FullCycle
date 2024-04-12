package save_balance

import (
	"github.com/rchau73/eda-challenge/consumer/internal/entity"
	"github.com/rchau73/eda-challenge/consumer/internal/gateway"
)

type SaveBalanceInputDTO struct {
	AccountID string  `json:"account_id"`
	Balance   float64 `json:"balance"`
}

type SaveBalanceOutputDTO struct {
	ID string
}

type SaveBalanceUseCase struct {
	BalanceGateway gateway.BalanceGateway
}

func NewSaveBalanceUseCase(b gateway.BalanceGateway) *SaveBalanceUseCase {
	return &SaveBalanceUseCase{
		BalanceGateway: b,
	}
}

func (uc *SaveBalanceUseCase) Execute(input SaveBalanceInputDTO) (*SaveBalanceOutputDTO, error) {
	output := &SaveBalanceOutputDTO{
		ID: input.AccountID,
	}
	balance, err := uc.BalanceGateway.FindByID(input.AccountID)
	if balance != nil && err == nil {
		balance.Balance = input.Balance
		err := uc.BalanceGateway.UpdateBalance(balance)
		if err != nil {
			return nil, err
		}
	} else {
		balance, err := entity.NewBalance(input.AccountID, input.Balance)
		if err != nil {
			return nil, err
		}
		err = uc.BalanceGateway.Save(balance)
		if err != nil {
			return nil, err
		}
	}

	return output, nil
}
