# tRPC

## Reture Type of

```ts
import type { RouterOutputs } from "@/utils/api";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return <div className=""></div>;
};
```

## Clerk user context

```ts
/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const { req } = opts;
  const sesh = getAuth(req);

  const userId = sesh.userId;

  return {
    prisma,
    currentUser: userId,
  };
};

// privateProcedure
const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.currentUser) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      currentUser: ctx.currentUser,
    },
  });
});

export const privateProcedure = t.procedure.use(enforceUserIsAuthed);
```
