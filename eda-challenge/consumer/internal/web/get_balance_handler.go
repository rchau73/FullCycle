package web

import (
	"encoding/json"
	"fmt"
	"net/http"

	findbyid_balance "github.com/rchau73/eda-challenge/consumer/internal/usecase/FindByID_balance"
)

type WebGetBalancerHandler struct {
	FindByIDBalanceUseCase findbyid_balance.FindByIDBalanceUseCase
}

func NewWebGetBalancerHandler(saveBalanceUseCase findbyid_balance.FindByIDBalanceUseCase) *WebGetBalancerHandler {
	return &WebGetBalancerHandler{
		FindByIDBalanceUseCase: saveBalanceUseCase,
	}
}

func (h *WebGetBalancerHandler) FindByIDBalance(w http.ResponseWriter, r *http.Request) {
	var dto findbyid_balance.FindByIDBalanceInputDTO
	err := json.NewDecoder(r.Body).Decode(&dto)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	output, err := h.FindByIDBalanceUseCase.Execute(dto)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(output)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
