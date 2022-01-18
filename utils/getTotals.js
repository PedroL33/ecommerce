const https = require('https');
const { BadRequest } = require('./errors');

exports.getTotal = async (address, cart, method) => {
  const subtotal = getSubtotal(cart);
  const shipping = getShippingPrice(method);
  if(address.split(',').length < 5) {
    throw new BadRequest("Invalid shipping address format.")
  }
  const taxRate = await getTaxRate(address);
  if(taxRate.error) {
    throw new BadRequest(taxRate.error.message)
  }
    
  return (subtotal.price + shipping) + ((subtotal.price + shipping) * taxRate.totalRate);
}

const getSubtotal = (cart) => {
  return cart.reduce((total, current) => {
    return { 
      price: total.price + current.price 
    }
  })
}

const getShippingPrice = (method) => {
  return method === "USPS Priority Mail" ? 5000: 2500;
}

const getTaxRate = (address) => {
  const zip = address.split(',')[4]
  const options = {
    hostname: "sandbox-rest.avatax.com",
    path: `/api/v2/taxrates/bypostalcode?country=us&postalCode=${zip.trim()}`,
    headers: {
      'Authorization': "Basic " + new Buffer.from(process.env.TAX_API_KEY)
    }
  }
  return new Promise((resolve, reject) => {
    https.get(options, res => {
      let body = "";
      res.setEncoding('utf-8');
      res.on("data", (data) => {
        body += data;
      })
      res.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed)
        }catch(err) {
          reject(err.message)
        }
      })
    })
  })
}