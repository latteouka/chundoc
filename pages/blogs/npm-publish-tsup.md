## NPM Publish

本身流程算是蠻簡單的，但開始注意檔案大小跟 bundle 方式，有一些新的發現。

最後要做的事情就是

```bash
npm publish

// 如果跳出有關public的錯誤
// 因為預設scope是private，但免費帳號又只能用public
npm publish --access public
```

## tsconfig.json

我原本是用 tsc 打包，但發現檔案很大，明明是很簡單的程式卻快要 20KB。

tsc 打包的話都是看 tsconfig 的參數。

後來我去觀察比較有名的專案發現，大家其實多是用 tsup 這個工具來產 cjs 跟 esm 最終程式碼的。

```json filename="tsc"
{
  "include": ["src"],
  "exclude": ["dist", "node_modules"],
  "compilerOptions": {
    "module": "esnext",
    "lib": ["dom", "esnext"],
    "importHelpers": true,
    "declaration": true,
    "sourceMap": false,
    "rootDir": "./src",
    "outDir": "./dist/esm",
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "moduleResolution": "node",
    "jsx": "react",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

如果改用 tsup 其實這裡面的設定就不是那麼重要了，會影響 IDE 顯示的警告跟 linting 設定。

```json filename="tsup"
{
  "include": ["src"],
  "exclude": ["dist", "node_modules"],
  "compilerOptions": {
    "module": "esnext",
    "lib": ["dom", "esnext"],
    "importHelpers": true,
    "declaration": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "moduleResolution": "node",
    "jsx": "react",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## tsup.config.json

```json
{
  "splitting": true,
  "sourcemap": false,
  "clean": true,
  "minify": true,
  "dts": true,
  "format": ["cjs", "esm"],
  "entry": ["src/index.ts"]
}
```

會產出

- ./dist/index.js (cjs)
- ./dist/index.mjs (esm)
- ./dist/index.d.ts (type)

## Package.json

我一直卡著出問題的最後發現是這裡面的設定。

要明確地把 main, module, types 指對才行。

tsup 會自己排除 dependencies 跟 peerDependencies，好像也不需要特地回 config 裡設定 external 了。

```json
{
  "name": "@chundev/gtranz",
  "description": "Page transition context with GSAP timeline.",
  "version": "1.1.1",
  "author": "latteouka",
  "license": "MIT",
  "keywords": ["react", "typescript", "nextjs", "transition"],
  "repository": {
    "type": "git",
    "url": "https://github.com/latteouka/gtranz"
  },
  "scripts": {
    "build": "tsup",
    "yalc": "yalc publish"
  },
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",

  "files": ["dist", "README.md"],

  "devDependencies": {
    "@types/node": "18.15.11",
    "@types/react": "18.0.37",
    "@types/react-dom": "18.0.11",
    "gsap": "^3.11.5",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tsup": "^6.7.0",
    "typescript": "5.0.4",
    "yalc": "^1.0.0-pre.53"
  },
  "peerDependencies": {
    "gsap": ">=3",
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

## yalc

很好用，可以讓你在本機模擬 publish 跟下載。

比如說 `yarn yalc publish`

會看見

```bash
yarn run v1.22.19
$ yalc publish
@chundev/gtranz@1.1.1 published in store.
```

這時就已經發布這個名稱的 package 到本機 `~/.yalc/packages` 底下。

於是可以在新的專案中用 `yarn yalc add @name/package` 來安裝並測試。
