**Clip a video**
```shell script
ffmpeg -y -ss ${timecode} -i input.mp4 -t ${clipDuration} -preset veryfast output.mp4
```

**Add logo on video**
```shell script
ffmpeg -y -i input.mp4 -i logo.png -filter_complex "overlay=${x in pixels}:${y in pixels}" -preset veryfast output.mp4
```

**Stream camera to twitch with dynamic text overlay**
```shell script
ffmpeg -rtsp_transport tcp -i ${camera_input} -re -stream_loop -1 -i {logo_path} -filter_complex overlay,scale=1280:-2,drawtext="fontfile={font_path}:bordercolor=0x000000:borderrw=1:fontcolor=0xFFFFFF:textfile={text_file_path}:reload=1:x=5:y=10:fontsize=38,format=yuv420p" -c:v libx264 -preset veryfast -b:v 4000k -f flv "rtmp://live.twitch.tv/app/{twitch_key}"
```
