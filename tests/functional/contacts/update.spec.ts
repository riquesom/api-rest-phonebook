import { test } from '@japa/runner'

test('Contacts update', async ({ client }) => {
  const response = await client.put('/contacts/1').form({
    name: 'John Doe Segundo',
    email: 'john.doe.segundo@gmail.com',
    address: '321 Mary Luid, X York, Xy 3055',
    phones: [
      {
        number: '321-456-7890',
      },
    ],
  })

  response.assertStatus(204)
})
