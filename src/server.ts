import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify from "fastify";
import { OAuth2Client } from 'google-auth-library';

const app = Fastify()
app.register(cors)

dotenv.config()

const port = Number(process.env.PORT) || 3333;

const oAuth2Client = new OAuth2Client(
  '803737317498-cb4apvh2fh5i6eei77vddooop7r5j3lm.apps.googleusercontent.com',
  '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',
  'postmessage',
);

app.get("/", (req, res) => {
  res.send({ ok: false })
})

app.post("/google", async (req, res) => {
  try {
    if (!req.body?.code) res.send({ ok: false, body: req.body })
    const { tokens } = await oAuth2Client.getToken(req.body.code)
  
    res.send(tokens);
  } catch (err) {
    console.log(err)
  }
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log('HTTP app runnig in http://localhost:3333')
})