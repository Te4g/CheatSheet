**Fix "Username Is Not In The Sudoers File. This Incident Will Be Reported"**
```shell script
su -
usermod -aG sudo USERNAME
newgrp sudo
```
