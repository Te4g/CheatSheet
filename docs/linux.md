**Start chromium in remote machine from ssh**
```shell script
ssh user@ip
DISPLAY=:0 chromium
```

**Format a USB key (exFat is compatible with all OS)**
```shell script
diskutil eraseDisk ExFAT {NAME_OF_USB_STICK} /dev/disk{X}
```
