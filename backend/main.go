package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path"

	"github.com/ghodss/yaml"
)

const base = "./config"

func GetHandler(w http.ResponseWriter, r *http.Request) {
	if path.Dir(r.URL.Path) != "/configs" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	name := path.Base(r.URL.Path)
	if name == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	file := path.Join(base, name)
	b, err := os.ReadFile(file)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	var data map[string]interface{}
	err = yaml.Unmarshal(b, &data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	text, err := json.Marshal(data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(text)
}

func main() {
	file := os.Args[1]
	dir := http.Dir(file)
	http.Handle("/", http.FileServer(dir))
	http.HandleFunc("/configs/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			GetHandler(w, r)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
		}
	})
	http.ListenAndServe(":3001", nil)
}
