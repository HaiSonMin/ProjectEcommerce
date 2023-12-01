const amqp = require('amqplib');
const CONSTANT = require('../../constant');
const producer = async ({ message, routingKey }) => {
  // 1.Connect
  const connect = await amqp.connect();
  // 2.Create channel
  const channel = connect.createChannel();
  // 3.Create exchange
  const exchangeName = 'TestExchange';
  (await channel).assertExchange(exchangeName, CONSTANT.TYPE_EXCHANGE.TOPIC, {
    durable: true,
  });
  // 4.Publish exchange
  (await channel).publish(exchangeName, routingKey, Buffer.from(message), {
    noAtk: true,
  });
  setTimeout(() => {
    connect.close();
    process.exit(0);
  }, 1000);
};

const args = process.argv.slice(2);
const routingKey = args[0];
const message = args[1];
producer({ message, routingKey });
