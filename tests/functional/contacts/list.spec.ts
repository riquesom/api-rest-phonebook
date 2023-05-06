import { test } from '@japa/runner'

test('Contacts list', async ({ client }) => {
  const response = await client.get('/contacts')

  response.assertStatus(200)
  response.assertBodyContains({
    meta: {},
    data: [
      {
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
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
        address: '123 Main St, New York, NY 10035',
        deleted: 0,
        phones: [
          {
            id: 3,
            contact_id: 2,
            number: '123-456-7892',
          },
          {
            id: 4,
            contact_id: 2,
            number: '123-456-7893',
          },
        ],
      },
    ],
  })
})
