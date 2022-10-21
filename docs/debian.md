**Fix "Username Is Not In The Sudoers File. This Incident Will Be Reported"**
```shell script
su -
usermod -aG sudo USERNAME
newgrp sudo
```

**Add a new user**
```shell script
sudo adduser ${username}
```

**Assign the sudo privileges to new user**
```shell script
sudo usermod -aG sudo ${username}
```
