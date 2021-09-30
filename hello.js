// class Provider {
//   /**
//    * Gets the weather for a given city
//    */
//   static getWeather(city) {
//     return Promise.resolve(`The weather of ${city} is Cloudy`)
//   }
//   /**
//    * Gets the weather for a given city
//    */
//   static getLocalCurrency(city) {
//     return Promise.resolve(`The local currency of ${city} is GBP`)
//   }
//   /**
//    * Given Longtitude and latitude, this function returns a city
//    */
//   static findCity(long, lat) {
//     return Promise.resolve(`London`)
//   }
// }

// Provider.findCity(51.5074, 0.1278).then(console.log)

// Provider.findCity(51.5074, 0.1278).then(Provider.getWeather).then(console.log)

// ;(async (city) => {
//   const weather = await Provider.getWeather(city)
//   const currency = await Provider.getLocalCurrency(city)
//   console.log(weather + " " + currency)
// })("London")

/**
 * Gets the processing page
 * @param {array} data
 */

function getErrorMessage(errorCode) {
  if (errorCode === "NO_STOCK") {
    return { title: "Error page", message: "No stock has been found" }
  }
  if (errorCode === "INCORRECT_DETAILS") {
    return { title: "Error page", message: "Incorrect details have been entered" }
  }
  return { title: "Error page", message: null }
}

function getSuccessMessage() {
  return { title: "Order complete", message: null }
}

const sampleArray = [{ state: "processing" }, { state: "error" }]

function getProcessingPage(data) {
  for (let item of data) {
    if (item.state === "processing") {
      new Promise((res, rej) => {
        setTimeout(res, 2000)
      })
    }
    if (item.state === "success") {
      return getSuccessMessage()
    }
    if (item.state === "error") {
      return getErrorMessage(item.errorCode)
    }
  }
}

getProcessingPage(sampleArray)
