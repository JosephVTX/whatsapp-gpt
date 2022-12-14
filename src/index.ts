import connectWhatsApp from './connection'
import { ChatGPTClient } from 'unofficial-chatgpt-api'
import { getCommand } from './utils/getCommand'
import { proto } from '@adiwajshing/baileys'
import ENV from './config/env'

const { clearanceToken, sessionToken0 } = ENV
const whatsapp = connectWhatsApp()
const gpt = new ChatGPTClient({
  clearanceToken: clearanceToken,
  sessionToken0: sessionToken0
})

whatsapp.then(async sock => {
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const messageInfo: proto.IWebMessageInfo = messages[0]
    const message: string =
      messages[0].message?.conversation ||
      messages[0].message?.extendedTextMessage?.text ||
      ''
    const remoteJid: string = messages[0].key.remoteJid || ''

    if (message.startsWith('/ia')) {
      const { parameter } = getCommand(message)

      try {
        const conversation = await gpt.startConversation()
        const response = await conversation.chat(parameter)
        const messageGpt = response.message.content.parts.toString()
        await sock.sendMessage(
          remoteJid,
          { text: messageGpt },
          { quoted: messageInfo }
        )
      } catch {
        await sock.sendMessage(
          remoteJid,
          { text: 'Error en el backend' },
          { quoted: messageInfo }
        )
      }
    }
  })
})
