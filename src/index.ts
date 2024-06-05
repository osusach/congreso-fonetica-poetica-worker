import { Hono } from 'hono'
import { z } from 'zod'
import { dbQuery } from './shared/dbQuery'
import { dbClient } from './shared/dbClient'
import listener from './listener/infrastructure/routes'
import interested from './interestedSpeaker/infrastructure/routes'

const app = new Hono<{Bindings: Bindings}>()



app.get('/', async (c) => { 
  return c.text('Hello Hono!')
})

app.route("/listener", listener)
app.route("/interested", interested)

export default app
