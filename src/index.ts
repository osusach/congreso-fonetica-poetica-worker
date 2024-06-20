import { Hono } from 'hono'
import { z } from 'zod'
import { dbQuery } from './shared/dbQuery'
import { dbClient } from './shared/dbClient'
import listener from './listener/infrastructure/routes'
import interested from './interestedSpeaker/infrastructure/routes'
import { cors } from 'hono/cors'

const app = new Hono<{Bindings: Bindings}>()
app.use(cors())



app.get('/', async (c) => { 
  return c.text('Hello Hono!')
})

app.route("/listener", listener)
app.route("/interested", interested)
app.route("/interested_speaker", interested)



export default app
