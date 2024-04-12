package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateBalance(t *testing.T) {
	balance, _ := NewBalance("1", 100)
	assert.NotNil(t, balance)
	assert.Equal(t, balance.ID, "1")
}

func TestCreateBalanceWithNegativeBalance(t *testing.T) {
	balance, error := NewBalance("1", -10)
	assert.Nil(t, balance)
	assert.EqualError(t, error, "Balance cannot be negative")
}

func TestCreateBalanceWithoutAccountID(t *testing.T) {
	balance, error := NewBalance("", 10)
	assert.Nil(t, balance)
	assert.EqualError(t, error, "Missing Account ID")
}

func TestUpdateBalance(t *testing.T) {
	balance, _ := NewBalance("1", 100)
	err := balance.UpdateBalance(50)
	assert.NoError(t, err)
	assert.Equal(t, balance.Balance, float64(50))
}
