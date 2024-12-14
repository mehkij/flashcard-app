package main

import (
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	mux := http.NewServeMux()

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Println("Serving files from . on port: 8080")
	log.Fatal(server.ListenAndServe())
}
