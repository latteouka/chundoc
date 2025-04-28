# install

```bash
yarn add pino pino-pretty
```

# logger

translateTime: "SYS:yyyy-mm-dd HH:MM:ss o"

o 是顯示時區資訊

```ts
import pino from "pino";

export const logger = pino({
  transport:
    process.env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss o",
          },
        },
  level: "debug",
});
```

```ts
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:yyyy-mm-dd HH:MM:ss o",
    },
  },
});
```

# Next.js

```typescript {16} filename="next.config.js"
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "pino", "pino-pretty"],
  },
};

export default config;
```

# trpc

```ts {21,32}
const loggingMiddleware = t.middleware(async ({ path, type, next, ctx }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;

  logger.info(
    {
      path,
      type,
      durationMs,
      username: ctx.session?.user.username,
    },
    "tRPC call",
  );

  return result;
});

// .......

export const publicProcedure = t.procedure.use(loggingMiddleware);

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure
  .use(loggingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
```
