require('now-env')
const { json, send } = require('micro')
const { router, post } = require('microrouter')

const moltinGateway = require('@moltin/sdk').gateway

const moltin = moltinGateway({
  client_id: process.env.MOLTIN_CLIENT_ID
})

module.exports = router(
  post('/', async (req, res) => {
    const {
      billing_address: billing,
      customer,
      product,
      token,
      shipping_address: shipping
    } = await json(req)

    try {
      // Get a new cart identifier
      const cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )

      // Add the product to our cart
      await moltin.Cart(cartId).AddProduct(product)

      // Create an order from the cart (checkout)
      const { json: order } = await moltin
        .Cart(cartId)
        .Checkout(customer, billing, shipping)

      // Pay for the order
      await moltin.Orders.Payment(order.data.id, {
        gateway: 'stripe',
        method: 'purchase',
        payment: token
      })

      // Success!
      send(res, 201)
    } catch ({ status, json }) {
      send(res, status, json.errors)
    }
  })
)
