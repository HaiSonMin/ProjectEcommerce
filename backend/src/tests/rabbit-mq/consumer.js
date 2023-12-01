const amqp = require('amqplib');
const CONSTANT = require('../../constant');

const consumer = async () => {
  // 1.Create connect
  const connect = await amqp.connect();
  // 2.Create channel
  const channel = connect.createChannel();
  // 3.Create exchange
  const exchangeName = 'TestExchange';
  (await channel).assertExchange(exchangeName, CONSTANT.TYPE_EXCHANGE.TOPIC, {
    durable: true,
  });
  // 4.Create queue
  const { queue } = (await channel).assertQueue('');
  // 5.Create bidding
  const args = process.argv.slice(2);
  const routingKey = args[0];
  (await channel).bindQueue(queue, exchangeName, routingKey);
  // 6.Consumer
  (await channel).consume(
    queue,
    (data) => {
      console.log(data.content.toString());
    },
    { noAck: true }
  );
};

consumer();
