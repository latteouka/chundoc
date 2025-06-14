# something else

## `video -> mp3`

```bash
ffmpeg -i input.wav -vn -ar 44100 -ac 2 -b:a 320k output.mp3
```

## `webm -> mp4`

```bash
ffmpeg -fflags +genpts -i x.webm -r 24 x.mp4
```

## `bash`

generate with same filename

```bash filename="all.sh"
for f in *.mp4; do ffmpeg -i "$f" -vn -ar 44100 -ac 2 -b:a 320k "$f".mp3; done
```
