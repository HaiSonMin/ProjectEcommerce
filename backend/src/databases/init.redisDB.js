const Redis = require('ioredis');

class RedisDB {
  constructor() {}

  static getInstance() {
    if (!this.instance)
      this.instance = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PW,
      });

    this.instance.on('connect', () => {
      console.error(
        `Redis connect successfully on port ${process.env.REDIS_PORT}`
      );
    });

    this.instance.on('error', (err) => {
      console.error('Redis Error:', err);
    });

    return this.instance;
  }
}

const redis = RedisDB.getInstance()

module.exports = redis;
