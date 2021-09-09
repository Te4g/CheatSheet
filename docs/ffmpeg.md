**Clip a video**
```shell script
ffmpeg -y -ss ${timecode} -i input.mp4 -t ${clipDuration} -preset veryfast output.mp4
```

**Add logo on video**
```shell script
ffmpeg -y -i input.mp4 -i logo.png -filter_complex "overlay=${x in pixels}:${y in pixels}" -preset veryfast output.mp4
```
