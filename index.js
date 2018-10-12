const { json, send } = require('micro')
const { router, post } = require('microrouter')
const cors = require('micro-cors')()

const { createClient } = require('@moltin/request')

const moltin = new createClient({
  client_id: process.env.MOLTIN_CLIENT_ID
})

module.exports = cors(
  router(
    post('/', async (req, res) => {
      const {
        billing_address,
        customer,
        product,
        token,
        shipping_address
      } = await json(req)

      try {
        // Get a new cart identifier
        const cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
          ((Math.random() * 16) | 0).toString(16)
        )

        // Add the product to our cart
        if (typeof product === 'object') {
          await moltin.post(`carts/${cartId}/items`, {
            ...body,
            type: 'custom_item'
          })
        } else {
          await moltin.post(`carts/${cartId}/items`, {
            id: product,
            quantity: 1,
            type: 'cart_item'
          })
        }

        let parsedCustomer = customer

        if (typeof customer === 'string') parsedCustomer = { id: customer }

        // Create an order from the cart (checkout)
        const {
          data: { id: orderId }
        } = await moltin.post(`carts/${cartId}/checkout`, {
          billing_address,
          customer: parsedCustomer,
          shipping_address: shipping_address || billing_address
        })

        // Pay for the order
        await moltin.post(`orders/${orderId}/payments`, {
          gateway: 'stripe',
          method: 'purchase',
          payment: token
        })

        // Success!
        send(res, 201, { id: orderId })
      } catch ({ status, title }) {
        send(res, status, title)
      }
    })
  )
)
