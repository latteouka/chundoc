## dayjs

顯示距離現在的時間。

```ts
// yarn add dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

dayjs(post.createdAt).fromNow();
```

中文

```ts
// yarn add dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import "dayjs/locale/zh-tw";
dayjs.locale("zh-tw");
```
