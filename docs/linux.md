**Start chromium in remote machine from ssh**
```shell script
ssh user@ip
DISPLAY=:0 chromium
```
**Format a USB key (exFat is compatible with all OS)**
```shell script
diskutil eraseDisk ExFAT {NAME_OF_USB_STICK} /dev/disk{X}
```
**Configure a RAID 5**
- List existing disk
```shell
fdisk -l 
```
- Get info about existing RAID
```shell
cat /proc/mdstat
```
- Get more info about a specific RAID
```shell
mdadm --detail /dev/md0
```
- Improve the speed of RAID creation
```shell
sysctl -w dev.raid.speed_limit_max=1000000
```
- Create the RAID with 4 disks:
```shell
mdadm --create /dev/md0 --level=5 --raid-devices=4 /dev/sda /dev/sdb /dev/sdc /dev/sdd
```
- Format the RAID volume as a partition
```shell
mkfs.ext4 /dev/md0
```
- Mount the RAID volume as a partition
```shell
mount /dev/md0 /mnt
```
- Make sure to keep the RAID configuration (reboot proof)
```shell
 vim /etc/mdadm.conf
ARRAY /dev/md0 UUID=2312awewae:123123awda:123123ssaada:1231dadawdaw
```
- The previous UUID can be found using this command:
```shell
mdadm --detail /dev/md0
```
- Regenerate initramfs
```shell
update-initramfs -u
```

