# [next] 什麼都做了兩次？

如果用 React 18 ↑，就要隨時記得 StrictMode 的影響。

如果用 Next.js，還要記得 Server 也會多做一次（如果這個行為有 side effect）。

## Next.js is a SSR framework

以在 Next.js 中使用 Websocket 來舉例，我要建立一個 Websocket 連線，然後用 jotai 來讓他成為全域 State。

```typescript
import socketIO from "socket.io-client";
import { atom, useAtom } from "jotai";

const webSocket_url = "http://localhost:4000";
ws = socketIO(webSocket_url);

export const wsAtom = atom(ws);
```

這時觀察 Backend Server 端會發現，不管怎麼樣都會起兩次連線，且該連線會隨著 Frontend 的 Process 關閉而結束。

這是因為 Next.js 在 SSR 時就會跑一次了，使用 SSR 框架時就需要多一層思考自己寫的東西在 Server 端及 Client 端的不同。（大部分時間都沒什麼問題，遇到問題時有這個概念你才能馬上警覺到。）

判斷是不是 Server 端可以用`if (typeof window !== "undefined") {}`。

```typescript
import socketIO, { Socket } from "socket.io-client";

import { atom, useAtom } from "jotai";

const webSocket_url = "http://localhost:4000";

let ws: Socket;

if (typeof window !== "undefined") {
  ws = socketIO(webSocket_url);
}

export const wsAtom = atom(ws!);
```

另外也可以考慮 `dynamic import` 來關掉 SSR：

```typescript
import dynamic from "next/dynamic";
const noSSR = dynamic(() => import("../../components/noSSR"), {
  ssr: false,
});
```

建立 Project 之前，是否需要 SSR 也是個思考課題？
