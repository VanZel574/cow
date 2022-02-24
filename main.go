package main

import (
	"cow-app/api"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// CORS
	router.Use(cors.Default())

	// Static
	router.Static("/assets", "frontend/dist/assets")
	router.StaticFile("/favicon.ico", "frontend/dist/favicon.ico")

	// Template
	router.LoadHTMLGlob("frontend/dist/index.html")

	// Basic route
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusAccepted, "index.html", nil)
	})

	// api endpoint
	router.GET("/api", api.MyApi)

	router.Run("127.0.0.1:8000") // listen and serve on 0.0.0.0:8080
}
