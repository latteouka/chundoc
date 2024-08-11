# mac dd mount

```bash
sudo hdiutil attach -readonly -imagekey diskimage-class=CRawDiskImage ~/Desktop/image.001
```

unmount

```bash
sudo hdiutil detach /Volumes/YourMountedVolumeName
```

mount status

```bash
mount
```
