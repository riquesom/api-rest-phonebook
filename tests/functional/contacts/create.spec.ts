import { test } from '@japa/runner'

test('Contacts create', async ({ client }) => {
  const response = await client.post('/contacts').form({
    name: 'Steve Austin',
    email: 'steve.austin@gmail.com',
    address: '123 Main St, New York, NY 10030',
    phones: [
      {
        number: '123-456-7890',
      },
      {
        number: '123-456-7891',
      },
    ],
  })

  response.assertStatus(201)
})
