import redis from "redis";

export const createRedisClient = async () => {
  let rediClient;
  (async () => {
    rediClient = redis.createClient();
    rediClient.on("error", (error) => console.log("redis eror" + error));
    await rediClient.connect();
  })();
  return await rediClient;
};
