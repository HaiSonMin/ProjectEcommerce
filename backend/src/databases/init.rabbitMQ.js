const amqp = require('amqplib');
const connectToRabbitMQ = async () => {
  try {
    // 1.Create connect
    const connect = await amqp.connect(process.env.RABBIT_HOST);
    if (connect) console.log(`Connect rabbitMQ successfully on port 5672`);
    // 2.Create channel
    const channel = await connect.createChannel();
    return { connect, channel };
  } catch (error) {
    throw new Error('Some thing went wrong when connect rabbitMQ');
  }
};

const producerMQ = async (exchangeName, routingKey, message) => {
  try {
    const { channel, connect } = await connectToRabbitMQ();

    // Create exchange
    await channel.assertExchange(exchangeName, 'topic', { durable: true });

    // Publish message
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  } catch (error) {
    throw new Error('Some thing went wrong when publish message');
  }
};

const consumerMQ = async (exchangeName, routingKey, queueName) => {
  try {
    const { channel, connect } = await connectToRabbitMQ();

    // Create exchange
    await channel.assertExchange(exchangeName, 'topic', { durable: true });

    // Create queue
    const { queue } = await channel.assertQueue(queueName || '');

    // Create bidding
    await channel.bindQueue(queue, exchangeName, routingKey);

    // Consumer
    await channel.consume(
      queue,
      (data) => {
        // 1.Find user is member of system
        // 2.Send email to member
        // 3.Logging trigger success
        // 4.Setup DLX "Dead Letter Exchange"
        // 4.1 Expire message
        // 4.2 Limited queue
        // 4.3 Send error

        console.log(data.connect.toString())
      },
      { noAck: true }
    );
  } catch (error) {
    throw new Error('Some thing went wrong when consumer message');
  }
};

module.exports = {
  connectToRabbitMQ,
  producerMQ,
  consumerMQ,
};
