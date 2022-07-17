const OAuth = require("oauth")
const { parse, formatURL } = require("./utils")

class Transport {
  oauth = OAuth.OAuth

  constructor(credentials) {
    this.credentials = credentials

    this.oauth = new OAuth.OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      this.credentials.apiKey,
      this.credentials.apiSecret,
      "1.0A",
      null,
      "HMAC-SHA1"
    )
  }

  async doGetRequest(url) {
    if (!this.oauth) {
      throw Error(
        "Unable to make request. Authentication has not been established"
      )
    }

    return new Promise((resolve, reject) => {
      if (
        !this.credentials.accessToken ||
        !this.credentials.accessTokenSecret
      ) {
        reject(
          new Error(
            "Unable to make request. Authentication has not been established"
          )
        )
        return
      }

      const formattedUrl = formatURL(url)

      this.oauth.get(
        formattedUrl,
        this.credentials.accessToken,
        this.credentials.accessTokenSecret,
        (err, body) => {
          if (err) {
            reject(err)
            return
          }

          if (!body) {
            resolve({})
            return
          }

          const result = parse(String(body))
          resolve(result)
        }
      )
    })
  }
}

module.exports = Transport
