## 從router input或output取

https://trpc.io/docs/client/vanilla/infer-types

```typescript
import type { inferRouterOutputs } from "@trpc/server";
import { type socialRouter } from "~/server/api/routers/social";

type SocialRouter = inferRouterOutputs<typeof socialRouter>;

# 注意是不是array
type SocialRouterFindMany = SocialRouter["socialTaskFindMany"]["tasks"][0];
```
