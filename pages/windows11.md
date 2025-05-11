## 右鍵換回舊選單樣式

```bash
# cmd 系統管理員mode
reg add HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32 /ve /f

# 工作管理員把檔案總管重啟

# 如果想換回去
reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f
```
