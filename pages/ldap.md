# 測試

```bash

# with filter
ldapsearch -x -H ldap://192.168.123.123:389 -D "CN=username,OU=ServiceAccount,DC=test,DC=gov,DC=tw" -w "password" -b "dc=test,dc=gov,dc=tw" "(cn=anotherUsername)"

ldapsearch -x -H ldap://192.168.123.123:389 -D "CN=username,OU=ServiceAccount,DC=test,DC=gov,DC=tw" -w "password" -b "dc=test,dc=gov,dc=tw" "(sAMAccountName=anotherUsername)"

# -x use simple authentication instead of SASL (Simple Authentication and Security Layer
# (Simple auth means just username and password — nothing fancy.)
# -H Specifies the LDAP server URI
# -D This is the bind DN (Distinguished Name) used to authenticate.
# -w password
# -b base DN
# "()" filter
```
