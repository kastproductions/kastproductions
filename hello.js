function priceCheck(products, productPrices, productSold, soldPrice) {
  // Write your code here
  const productMAp = products.reduce((acc, product, index) => {
    acc[product] = productPrices[index]
    return acc
  }, {})

  const productErrorCount = productSold.reduce((acc, product, index) => {
    if (productMAp[product] !== soldPrice[index]) {
      acc++
      return acc
    }
    return acc
  }, 0)
  return productErrorCount
}
