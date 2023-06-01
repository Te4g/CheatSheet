**Get ansible facts**
```shell script
ansible localhost -m setup
```

**Run direct commands**
```bash
ansible all -a "whereis python"
```

**Create a role**
```bash
# flag --init-path is optional, default is current path
ansible-galaxy init {role_name} --init-path {path}
```

**Find ansible roles by author**
```bash
ansible-galaxy search web --author Te4g
```

**Install a role**
```bash
ansible-galaxy install {role}
```

**Use ansible with a passphrase protected ssh key**
```bash
ansible all -i inventory.yml -m ping --ask-pass
```

**Speficy host directly on command line (the "," is not a typo)**
```bash
ansible-playbook -i localhost:2222, playbooks/secure-vps.yml -u ubuntu --ask-become 
```
