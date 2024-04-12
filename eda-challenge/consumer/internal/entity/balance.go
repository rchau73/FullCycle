package entity

import (
	"errors"
)

type Balance struct {
	ID      string
	Balance float64
}

func NewBalance(id string, amount float64) (*Balance, error) {
	balance := &Balance{
		ID:      id,
		Balance: amount,
	}

	err := balance.Validate()
	if err != nil {
		return nil, err
	}

	return balance, nil
}

func (b *Balance) Validate() error {
	if b.Balance < 0 {
		return errors.New("Balance cannot be negative")
	}
	if b.ID == "" {
		return errors.New("Missing Account ID")
	}
	return nil
}

func (b *Balance) UpdateBalance(amount float64) error {
	b.Balance = amount

	err := b.Validate()
	if err != nil {
		return err
	}
	return nil
}
