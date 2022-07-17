const express = require("express")
const Transport = require("./src/base/Transport")
const app = express()
const port = 3000

const credentials = {
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
}

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/api/auth", (req, res) => {
  const transport = new Transport(credentials)
  res.send(transport)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
