import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify from "fastify";
import { OAuth2Client } from 'google-auth-library';

const server = Fastify()
server.register(cors)

dotenv.config()

const oAuth2Client = new OAuth2Client(
  '803737317498-cb4apvh2fh5i6eei77vddooop7r5j3lm.apps.googleusercontent.com',
  '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',
  'postmessage',
);

server.get("/", (req, res) => {
  res.send({ ok: false })
})

server.post("/google", async (req, res) => {
  try {
    if (!req.body?.code) res.send({ ok: false, body: req.body })
    const { tokens } = await oAuth2Client.getToken(req.body.code)
  
    res.send(tokens);
  } catch (err) {
    console.log(err)
  }
})

server.listen(
  { port: 3333 },
  (err, address) => console.log(`Server listening at ${address}`)
)
