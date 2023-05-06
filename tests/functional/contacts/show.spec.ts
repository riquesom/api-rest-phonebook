import { test } from '@japa/runner'

test('Contacts show', async ({ client }) => {
  const response = await client.get('/contacts/1')

  response.assertStatus(200)
  response.assertBodyContains({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    address: '123 Main St, New York, NY 10030',
    deleted: 0,
    phones: [
      {
        id: 1,
        contact_id: 1,
        number: '123-456-7890',
      },
      {
        id: 2,
        contact_id: 1,
        number: '123-456-7891',
      },
    ],
  })
})
