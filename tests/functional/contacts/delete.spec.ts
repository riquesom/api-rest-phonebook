import { test } from '@japa/runner'

test('Contacts delete', async ({ client }) => {
  const response = await client.delete('/contacts/3')

  response.assertStatus(204)
})
