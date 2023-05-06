import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import ContactSeeder from 'Database/seeders/Contact'

export default class extends BaseSchema {
  protected tableName = 'run_seeders'

  public async up() {
    const seeder = new ContactSeeder(this.db)
    await seeder.run()
  }

  public async down() {}
}
