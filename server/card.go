package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/mehkij/flashcard-app/internal/database"
)

type Card struct {
	ID          uuid.UUID `json:"id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	LastTested  time.Time `json:"last_tested"`
}

func (cfg *apiConfig) createCardHandler(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Title       string    `json:"title"`
		Description string    `json:"description"`
		LastTested  time.Time `json:"last_tested"`
	}

	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		log.Printf("Error decoding params: %s", err)
		w.WriteHeader(500)
		return
	}

	card, err := cfg.queries.CreateCard(r.Context(), database.CreateCardParams{
		Title:       params.Title,
		Description: params.Description,
		LastTested: sql.NullTime{
			Time: params.LastTested,
		},
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error creating card: %s", err))
		return
	}

	respondWithJSON(w, 201, Card{
		ID:          card.ID,
		CreatedAt:   card.CreatedAt,
		UpdatedAt:   card.UpdatedAt,
		Title:       card.Title,
		Description: card.Description,
		LastTested:  card.LastTested.Time,
	})
}

func (cfg *apiConfig) getCardsHandler(w http.ResponseWriter, r *http.Request) {
	cards, err := cfg.queries.GetCards(r.Context())
	if err != nil {
		log.Printf("Error decoding params: %s", err)
		w.WriteHeader(500)
		return
	}

	var payload []Card

	for _, card := range cards {
		payload = append(payload, Card{
			ID:          card.ID,
			CreatedAt:   card.CreatedAt,
			UpdatedAt:   card.UpdatedAt,
			Title:       card.Title,
			Description: card.Description,
			LastTested:  card.LastTested.Time,
		})
	}

	respondWithJSON(w, 200, payload)
}
