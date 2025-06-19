import { createConsumer } from "actioncable"

const consumer = createConsumer(`${process.env.VUE_APP_WEB_SOCKET_URL || "wss://api.robertvitoriano.com:3000"}/cable`)

export default consumer
