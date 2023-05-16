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


