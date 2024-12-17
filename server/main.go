package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/mehkij/flashcard-app/internal/database"
)

type apiConfig struct {
	queries *database.Queries
}

func main() {
	godotenv.Load()
	dbURL := os.Getenv("DB_URL")

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Printf("Unable to open connection to DB: %s", err)
	}
	defer db.Close()

	dbQueries := database.New(db)

	apiCfg := &apiConfig{
		queries: dbQueries,
	}

	mux := http.NewServeMux()

	// GET
	mux.HandleFunc("GET /api/cards", apiCfg.getCardsHandler)

	// POST
	mux.HandleFunc("POST /api/new-card", apiCfg.createCardHandler)

	server := &http.Server{
		Addr:    ":8080",
		Handler: corsMiddleware(mux),
	}

	log.Println("Serving files from . on port: 8080")
	log.Fatal(server.ListenAndServe())
}
