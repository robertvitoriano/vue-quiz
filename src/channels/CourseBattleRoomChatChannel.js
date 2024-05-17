import { createConsumer } from "actioncable"

const consumer = createConsumer(`${process.env.VUE_APP_WEB_SOCKET_URL}/cable`)

export default consumer
