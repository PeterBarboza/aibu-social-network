import { app, port } from "./app"
import { connectToMongoDB } from "./database"

app.listen(port, () => {
  //TODO: Substituir logs por um logger de produção
  console.log(`Server is running on http://localhost:${port}`)

  connectToMongoDB()
})