import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import RecordNotFoundException from 'App/Exceptions/RecordNotFoundException'

import Contact from 'App/Models/Contact'
import axios from 'axios'

export default class ContactsController {
  public async list({ request }: HttpContextContract) {
    const filters = {
      name: request.input('name', ''),
      email: request.input('email', ''),
      address: request.input('address', ''),
      phone: request.input('phone', ''),
    }

    const page = request.input('page', 1)
    const limit = 10

    const contacts = Contact.query().preload('phones').where('deleted', false)

    if (filters.name) {
      contacts.where('name', 'like', `%${filters.name}%`)
    }

    if (filters.email) {
      contacts.where('email', 'like', `%${filters.email}%`)
    }

    if (filters.address) {
      contacts.where('address', 'like', `%${filters.address}%`)
    }

    if (filters.phone) {
      contacts.whereHas('phones', (query) => {
        query.where('phone', 'like', `%${filters.phone}%`)
      })
    }

    return (await contacts.orderBy('id').paginate(page, limit)).toJSON()
  }

  public async create({ request, response }: HttpContextContract) {
    const postSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      email: schema.string({ trim: true }, [rules.maxLength(255), rules.email()]),
      address: schema.string({ trim: true }, [rules.maxLength(255)]),
      phones: schema.array().members(
        schema.object().members({
          number: schema.string({ trim: true }, [rules.maxLength(255)]),
        })
      ),
    })

    const payload = await request.validate({ schema: postSchema })

    const contact = await Contact.create(payload)

    await contact.related('phones').createMany(payload.phones)

    return response.created(contact)
  }

  public async show({ params }: HttpContextContract) {
    const contact = await Contact.query()
      .preload('phones')
      .where('id', params.id)
      .where('deleted', false)
      .firstOrFail()
      .catch(() => {
        throw new RecordNotFoundException('Contact not found!')
      })
    let suggestions = ''

    try {
      const request = await axios.get('https://api.hgbrasil.com/weather', {
        params: {
          key: 'f0b0c0d0',
          city_name: contact.address.split(',').slice(-2)[0].trim(),
        },
      })

      const temperature = request.data.results.temp
      const conditionSlug = request.data.results.condition_slug

      switch (true) {
        case temperature <= 18:
          suggestions = 'Ofereça um chocolate quente ao seu contato...'
          break

        case temperature >= 30 && conditionSlug === 'rain':
          suggestions = 'Convide seu contato para tomar um sorvete.'
          break

        case temperature >= 30:
          suggestions = 'Convide seu contato para ir à praia com esse calor!'
          break

        case temperature < 30 && temperature > 18 && conditionSlug === 'clear_day':
          suggestions = 'Convide seu contato para fazer alguma atividade ao livre.'
          break

        case temperature < 30 && temperature > 18 && conditionSlug === 'rain':
          suggestions = 'Convide seu contato para ver um filme.'
          break

        default:
          suggestions = 'Não há sugestões disponíveis.'
      }
    } catch (error) {
      suggestions =
        'Não há sugestões disponíveis pois não foi possível obter a temperatura da cidade do contato'
    }
    return { ...contact.toJSON(), suggestions }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const postSchema = schema.create({
      name: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
      email: schema.string.optional({ trim: true }, [rules.maxLength(255), rules.email()]),
      address: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
      phones: schema.array.optional().members(
        schema.object().members({
          id: schema.number.optional(),
          number: schema.string({ trim: true }, [rules.maxLength(255)]),
        })
      ),
    })

    const payload = await request.validate({ schema: postSchema })

    const contact = await Contact.findOrFail(params.id).catch(() => {
      throw new RecordNotFoundException('Contact not found!')
    })

    await contact.merge(payload).save()

    if (payload.phones) {
      payload.phones.forEach((element) => {
        if (element.id) {
          contact.related('phones').updateOrCreate({ id: element.id }, element)
        } else {
          contact.related('phones').create(element)
        }
      })
    }

    return response.noContent()
  }

  public async delete({ params, response }: HttpContextContract) {
    const contact = await Contact.findOrFail(params.id).catch(() => {
      throw new RecordNotFoundException('Contact not found!')
    })

    await contact.merge({ deleted: true }).save()

    return response.noContent()
  }
}
