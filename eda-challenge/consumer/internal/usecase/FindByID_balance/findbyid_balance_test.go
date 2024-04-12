package findbyid_balance

import (
	"testing"

	"github.com/rchau73/eda-challenge/consumer/internal/entity"
	"github.com/rchau73/eda-challenge/consumer/internal/usecase/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestFindByIDBalanceUseCase_Execute(t *testing.T) {
	balance, _ := entity.NewBalance("1", 200)

	BalanceMock := &mocks.BalanceGatewayMock{}
	BalanceMock.On("FindByID", mock.Anything).Return(balance, nil)

	uc := NewFindByIDBalanceUseCase(BalanceMock)
	inputDto := FindByIDBalanceInputDTO{
		AccountID: balance.ID,
	}
	output, err := uc.Execute(inputDto)
	assert.Nil(t, err)
	assert.NotNil(t, output.ID)

	BalanceMock.AssertExpectations(t)
	BalanceMock.AssertNumberOfCalls(t, "FindByID", 1)
}
