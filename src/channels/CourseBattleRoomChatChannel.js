import { createConsumer } from "actioncable"

const consumer = createConsumer("ws://localhost:3000/cable")

export default consumer
