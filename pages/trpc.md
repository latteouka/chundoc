# inferring types

```typescript
// 我不太用到input
import type { inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
type RouterOutput = inferRouterOutputs<AppRouter>;
type Mission = RouterOutput["mission"]["list"][0];
```
