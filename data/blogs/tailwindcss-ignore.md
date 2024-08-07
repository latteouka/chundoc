在導入 TailwindCss 的時候，這個錯誤總是會顯示在那邊，一直以來都沒去甩他，這幾天又在喬 Nvim 就順便一下。

```css filename="global.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`unknown at rule @tailwind css(unknownatrules) nvim`

在 lspconfig 中，加上 settings 這段去設定要忽略的規則。

```lua {4-23} filename="lspconfig.lua"
nvim_lsp.cssls.setup {
  on_attach = on_attach,
  capabilities = capabilities,
  settings = {
    css = {
      validate = true,
      lint = {
        unknownAtRules = "ignore"
      }
    },
    scss = {
      validate = true,
      lint = {
        unknownAtRules = "ignore"
      }
    },
    less = {
      validate = true,
      lint = {
        unknownAtRules = "ignore"
      }
    },
  },
}
```

最近 Packer 按了更新，一口氣下來好多東西都被動到，花了不少時間去調整，
不過也有變好的地方，舒服～，對各種設定又更了解了。
