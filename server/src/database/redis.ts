import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

const redisClient = new Redis(redisUrl as string);

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export default redisClient;
