## dayjs

```ts
// yarn add dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

dayjs(post.createdAt).fromNow();
```
