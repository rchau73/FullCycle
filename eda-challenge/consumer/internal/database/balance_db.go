package database

import (
	"database/sql"

	"github.com/rchau73/eda-challenge/consumer/internal/entity"
)

type BalanceDB struct {
	DB *sql.DB
}

func NewBalanceDB(db *sql.DB) *BalanceDB {
	return &BalanceDB{
		DB: db,
	}
}

func (a *BalanceDB) FindByID(id string) (*entity.Balance, error) {
	var balance entity.Balance

	stmt, err := a.DB.Prepare("Select account_id, balance FROM balances WHERE account_id = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	row := stmt.QueryRow(id)
	err = row.Scan(
		&balance.ID,
		&balance.Balance)
	if err != nil {
		return nil, err
	}
	return &balance, nil
}

func (a *BalanceDB) Save(balance *entity.Balance) error {
	stmt, err := a.DB.Prepare("INSERT INTO balances (account_id, balance) VALUES (?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(balance.ID, balance.Balance)
	if err != nil {
		return err
	}
	return nil
}

func (a *BalanceDB) UpdateBalance(balance *entity.Balance) error {
	stmt, err := a.DB.Prepare("UPDATE balances SET balance = ? WHERE account_id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(balance.Balance, balance.ID)
	if err != nil {
		return err
	}
	return nil
}
