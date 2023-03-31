---
sidebar_position: 6
---

# [rn]Keychain

## keytool

在目錄下產出.keystore 檔案，產出後丟到`/android/app`底下，要好好另外保管（.gitignore 預設忽略）。

```bash
keytool -genkey -v -keystore <keystoreName>.keystore -alias <aliasName> -keyalg RSA -keysize 2048 -validity 10000
```

## gradle.properties

填入剛剛 keytool 寫的資訊。

```js
APP_STORE_FILE = keystoreName.keystore;
APP_KEY_ALIAS = aliasName;
APP_STORE_PASSWORD = store密碼;
APP_KEY_PASSWORD = key密碼;
```

## android/app/build.gradle

記得要把`signingConfigs.debug`改成`signingConfigs.release`，不然就還是在用舊的，上傳後 Play Console 會跟你抱怨你是用 debug mode 簽署不給過。

```java
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(APP_STORE_FILE)
            keyAlias APP_KEY_ALIAS
            storePassword APP_STORE_PASSWORD
            keyPassword APP_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```
