package update_balance

import (
	"testing"

	"github.com/rchau73/eda-challenge/consumer/internal/entity"
	"github.com/rchau73/eda-challenge/consumer/internal/usecase/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestUpdateBalanceUseCase_Execute(t *testing.T) {
	balance, _ := entity.NewBalance("1", 200)

	BalanceMock := &mocks.BalanceGatewayMock{}
	BalanceMock.On("UpdateBalance", mock.Anything).Return(nil)

	uc := NewUpdateBalanceUseCase(BalanceMock)
	inputDto := UpdateBalanceInputDTO{
		AccountID: balance.ID,
		Balance:   balance.Balance,
	}
	output, err := uc.Execute(inputDto)
	assert.Nil(t, err)
	assert.NotNil(t, output.ID)

	BalanceMock.AssertExpectations(t)
	BalanceMock.AssertNumberOfCalls(t, "UpdateBalance", 1)
}
