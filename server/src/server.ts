import Fastify from 'fastify'
import cors from '@fastify/cors'

import { appRoutes } from './routes'

const app = Fastify()

app.register(cors)
app.register(appRoutes)


app.listen({
  port: 5555,
  host: '0.0.0.0'
}).then((url) => {
  console.log(`HTTP Server Running on: ${url}`)
})