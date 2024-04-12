package save_balance

import (
	"testing"

	"github.com/rchau73/eda-challenge/consumer/internal/entity"
	"github.com/rchau73/eda-challenge/consumer/internal/usecase/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestSaveBalanceUseCase_Execute(t *testing.T) {
	balance, _ := entity.NewBalance("1", 200)

	BalanceMock := &mocks.BalanceGatewayMock{}
	BalanceMock.On("FindByID", mock.Anything).Return(nil, nil)
	BalanceMock.On("Save", mock.Anything).Return(nil)

	uc := NewSaveBalanceUseCase(BalanceMock)
	inputDto := SaveBalanceInputDTO{
		AccountID: balance.ID,
	}
	output, err := uc.Execute(inputDto)
	assert.Nil(t, err)
	assert.NotNil(t, output.ID)

	BalanceMock.AssertExpectations(t)
	BalanceMock.AssertNumberOfCalls(t, "FindByID", 1)
	BalanceMock.AssertNumberOfCalls(t, "Save", 1)
}

func TestUpdateBalanceUseCase_Execute(t *testing.T) {
	balance, _ := entity.NewBalance("1", 500)

	BalanceMock := &mocks.BalanceGatewayMock{}
	BalanceMock.On("FindByID", mock.Anything).Return(balance, nil)
	BalanceMock.On("UpdateBalance", mock.Anything).Return(nil)

	uc := NewSaveBalanceUseCase(BalanceMock)
	inputDto := SaveBalanceInputDTO{
		AccountID: balance.ID,
	}
	output, err := uc.Execute(inputDto)
	assert.Nil(t, err)
	assert.NotNil(t, output.ID)

	BalanceMock.AssertExpectations(t)
	BalanceMock.AssertNumberOfCalls(t, "FindByID", 1)
	BalanceMock.AssertNumberOfCalls(t, "UpdateBalance", 1)
}
