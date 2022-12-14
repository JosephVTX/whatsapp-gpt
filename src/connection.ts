import makeWASocket, { useMultiFileAuthState } from '@adiwajshing/baileys'
import PINO from 'pino'

const connectWhatsApp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('auth_whatsapp')
  const sock = await makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: PINO({ level: 'error' }),
    syncFullHistory: false
  })

  await sock.ev.on('connection.update', ({ connection }) => {
    if (connection === 'close') {
      saveCreds()
      connectWhatsApp()
    }
  })

  return await sock
}

export default connectWhatsApp
