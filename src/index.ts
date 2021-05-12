import { app, server } from './infra/io'
import { routes } from './routes'
app.use(routes)
server.listen(process.env.PORT || 3333, () => console.log("Server is running"))