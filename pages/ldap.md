# 測試

```bash

# with filter
ldapsearch -x -H ldap://192.168.123.123:389 -D "CN=username,OU=ServiceAccount,DC=test,DC=gov,DC=tw" -w "password" -b "dc=test,dc=gov,dc=tw" "(cn=anotherUsername)"
```
