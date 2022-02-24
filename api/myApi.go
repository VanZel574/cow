package api

import "github.com/gin-gonic/gin"

func MyApi(c *gin.Context) {
	c.JSON(200, gin.H{"hello": "world"})
}
