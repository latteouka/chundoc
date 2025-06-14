# Update Session

跟 strategy 用什麼有關。

https://next-auth.js.org/getting-started/client#updating-the-session

```ts {3-7} filename="auth.ts"
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
       // 這邊session object是從 useSession 的 update function 傳進去的東西
      if (trigger === "update") {
        token.username = session.username;
        token.unitId = session.unitId;
        return token;
      }

      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.unitId = user.unitId;
        token.favorites = user.favorites;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id;
      session.username = token.username;
      session.role = token.role;
      session.unitId = token.unitId;
      session.favorites = token.favorites;
      return session;
    },
  },
```

```ts {1, 8-11} filename="component.ts"
const { data: session, update: updateSession } = useSession();

const update = api.user.update.useMutation({
  onSuccess: async (values) => {
    await refetch();
    // 如果更新是自己的帳號就更新session
    if (session.user.id === item.id) {
      await updateSession({
        username: values.username,
        unitId: values.unitId,
      });
    }
    toast.success("更新帳戶資訊");
  },
});
```
