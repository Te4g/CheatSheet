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

**Resize image**
```shell script
ffmpeg -i input.jpg -vf scale={size_in_px}:-2 output.png
```

**Get first frame**
```shell script
 ffmpeg -i input.mp4 -vframes 1 output.png
```

**Get 1 frame at a specific time**
```shell script
ffmpeg -i input.mp4 -ss 01:23:45 -vframes 1 output.png
``` 
```
-i input file           the path to the input file  
-ss 01:23:45            seek the position to the specified timestamp  
-vframes 1              only handle one video frame  
output.png              output filename, should have a well-known extension  
The -ss parameter accepts a value in the form HH:MM:SS[.xxx] or as a number in seconds. 
```

**Take a screenshot from a RTSP endpoint**
```bash
ffmpeg -rtsp_transport tcp -i "rtsp://ip:port" -vframes 1 screenshot.png 
```

**List audio devices**
```bash
arecord -l
arecord -L
```

**Get details of an audio device**
```bash
arecord --dump-hw-params -D ${DEVICE_NAME}
```

**Record 30 seconds from an audio device**
```bash
ffmpeg -f alsa -i ${DEVICE_NAME} -t 30 output.wav
```

**Record 30 seconds from an audio device by specifying codec**
```bash
ffmpeg -f alsa -c:a pcm_s32le -i ${DEVICE_NAME} -t 30 output.wav
```

**Add GIF to video which repeat themselves**
```bash
ffmpeg -stream_loop -1 -i gif1.gif -stream_loop -1 -i gif2.gif -i videoInput.mp4 -filter_complex "[2:v][0:v]overlay=10:10[bg];[bg][1:v]overlay=10:250" -preset veryfast -t 60 output.mp4
```

**Create video from still images where images repeat themselves (1/10 for 10 seconds per image)**
```bash
ffmpeg -y -framerate 1/10 -i logo%d.png -r 25 output.mp4
```
