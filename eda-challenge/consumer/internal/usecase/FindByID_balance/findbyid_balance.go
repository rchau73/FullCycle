package findbyid_balance

import (
	"github.com/rchau73/eda-challenge/consumer/internal/gateway"
)

type FindByIDBalanceInputDTO struct {
	AccountID string `json:"account_id"`
}

type FindByIDBalanceOutputDTO struct {
	ID      string  `json:"account_id"`
	Balance float64 `json:"balance"`
}

type FindByIDBalanceUseCase struct {
	BalanceGateway gateway.BalanceGateway
}

func NewFindByIDBalanceUseCase(b gateway.BalanceGateway) *FindByIDBalanceUseCase {
	return &FindByIDBalanceUseCase{
		BalanceGateway: b,
	}
}

func (uc *FindByIDBalanceUseCase) Execute(input FindByIDBalanceInputDTO) (*FindByIDBalanceOutputDTO, error) {
	balance, err := uc.BalanceGateway.FindByID(input.AccountID)
	if err != nil {
		return nil, err
	}
	output := &FindByIDBalanceOutputDTO{
		ID:      balance.ID,
		Balance: balance.Balance,
	}
	return output, nil
}
