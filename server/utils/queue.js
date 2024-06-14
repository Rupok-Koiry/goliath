const amqp = require('amqplib');

const { QUEUE_URL } = process.env;
const QUEUE_NAME = 'new_scan';

class Queue {
  static async create() {
    if (!QUEUE_URL) {
      throw new Error('No Queue URL!');
    }
    const conn = await amqp.connect(QUEUE_URL);
    const channel = await conn.createChannel();
    const assert = await channel.assertQueue(QUEUE_NAME);
    console.log('Queue Assert: ', assert);
    return new Queue(conn, channel);
  }

  constructor(conn, channel) {
    this.connection = conn;
    this.channel = channel;
  }

  async send(message) {
    return this.channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
  }
}

module.exports = Queue;
