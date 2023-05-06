import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Contact from 'App/Models/Contact'
import ContactPhone from 'App/Models/ContactPhone'

export default class ContactSeeder extends BaseSeeder {
  public async run() {
    const contacts = await Contact.createMany([
      {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        address: '123 Main St, New York, NY 10030',
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
        address: '123 Main St, New York, NY 10035',
      },
    ])

    await ContactPhone.createMany([
      {
        contactId: contacts[0].id,
        number: '123-456-7890',
      },
      {
        contactId: contacts[0].id,
        number: '123-456-7891',
      },
      {
        contactId: contacts[1].id,
        number: '123-456-7892',
      },
      {
        contactId: contacts[1].id,
        number: '123-456-7893',
      },
    ])
  }
}
