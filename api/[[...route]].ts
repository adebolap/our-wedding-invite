import { handle } from "hono/vercel"
import app from "../server/app.js"

export const config = {
  runtime: "nodejs",
  api: {
    bodyParser: false,
  },
}

export default handle(app)
