## Upstash

在 server 端限制 user spam

Serverless Data for Redis

https://github.com/upstash/ratelimit

```bash
npm install @upstash/redis
npm install @upstash/ratelimit

yarn add @upstash/redis
yarn add @upstash/ratelimit

yarn add @upstash/redis @upstash/ratelimit
```

## Create Database

Follow instruction and get keys.

## Put the limiter inside serverside code

### tRPC(router):

init:

```ts filename="posts.ts"
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),

  // Create a new ratelimiter, that allows 10 requests per 10 seconds
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});
```

```ts
// Create a new ratelimiter, that allows 3 requests per 1 minute
limiter: Ratelimit.slidingWindow(3, "1 m"),
```

inside Procedures(for example: create post):

```ts
const { success } = await ratelimit.limit(authorId);

if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
```
