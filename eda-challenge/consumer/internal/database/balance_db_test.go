package database

import (
	"database/sql"
	"testing"

	_ "github.com/mattn/go-sqlite3"

	"github.com/rchau73/eda-challenge/consumer/internal/entity"
	"github.com/stretchr/testify/suite"
)

type BalanceDBTestSuite struct {
	suite.Suite
	db        *sql.DB
	balance1  *entity.Balance
	balance2  *entity.Balance
	balanceDB *BalanceDB
}

func (s *BalanceDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Nil(err)
	s.db = db
	db.Exec("Create table balances (account_id varchar(255), balance int)")

	s.balance1, _ = entity.NewBalance("1", 100)
	s.balance2, _ = entity.NewBalance("2", 200)
	s.balanceDB = NewBalanceDB(db)
}

func (s *BalanceDBTestSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("DROP TABLE balances")
}

func TestBalanceDBTestSuite(t *testing.T) {
	suite.Run(t, new(BalanceDBTestSuite))
}

func (s *BalanceDBTestSuite) TestSave() {
	newBalance, err := entity.NewBalance(s.balance1.ID, s.balance1.Balance*5)
	s.Nil(err)
	err = s.balanceDB.Save(newBalance)
	s.Nil(err)
	s.Equal(s.balance1.ID, newBalance.ID)
	s.Equal(s.balance1.Balance*5, newBalance.Balance)
}

func (s *BalanceDBTestSuite) TestFindByID() {
	err := s.balanceDB.Save(s.balance1)
	s.Nil(err)
	newBalance, err := s.balanceDB.FindByID(s.balance1.ID)
	s.Nil(err)
	s.Equal(s.balance1.ID, newBalance.ID)
	s.Equal(s.balance1.Balance, newBalance.Balance)
}

func (s *BalanceDBTestSuite) TestNotFindByID() {
	newBalance, err := s.balanceDB.FindByID(s.balance1.ID)
	s.Nil(newBalance)
	s.Equal(err.Error(), "sql: no rows in result set")
}

func (s *BalanceDBTestSuite) TestUpdateBalance() {
	err := s.balanceDB.Save(s.balance2)
	s.Nil(err)
	s.balance2.Balance = s.balance1.Balance

	err = s.balanceDB.UpdateBalance(s.balance2)
	s.Nil(err)

	newBalance, err := s.balanceDB.FindByID(s.balance2.ID)
	s.Nil(err)
	s.Equal(s.balance2.ID, newBalance.ID)
	s.Equal(s.balance1.Balance, newBalance.Balance)
}
