/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import Migrator from '@ioc:Adonis/Lucid/Migrator'

Route.get('/', async () => {
  const migrator = new Migrator(Database, Application, {
    direction: 'up',
    dryRun: false,
    // connectionName: 'pg',
  })

  await migrator.run()
  return { hello: 'world' }
})

Route.group(async () => {
  Route.post('/', 'ContactsController.create')
  Route.get('/', 'ContactsController.list')
  Route.get('/:id', 'ContactsController.show')
  Route.put('/:id', 'ContactsController.update')
  Route.delete('/:id', 'ContactsController.delete')
}).prefix('/contacts')
