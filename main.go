package main

import (
	"net/http"
)

type Secret struct {
	Passhprase string `json:"passphrase"`
	Burnafter  string `json:"burnafter"`
	Secret     string `json:"secret"`
}

func handleSecret(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("{\"Hello\":\"world !\"}"))
}

func main() {
	http.HandleFunc("/api/secret", handleSecret)
	http.ListenAndServe(":7000", nil)
}
