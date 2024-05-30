**Create SSH keys**
```shell script
ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
```
```shell script
ssh-keygen -t ed25519 -C "your_email@example.com"
```
**Create reverse SSH tunnel**
- From distant machine
```shell script
ssh -R {local_machine_port}:localhost:22 {user}@{local_machine_ip}
```

- From local machine
```shell script
ssh {distant_machine_user}@localhost -p {local_machine_port}
```

**Redirect distant port to local machine**
- From local machine
```shell script
ssh -L {local_machine_port}:localhost:{distant_machine_port} {user}@{distant_machine_ip}
```

**Copy files**
- From local to distant
```shell script
scp {local_file_path} {user}@{distant_machine_ip}:{desired_distant_path_to_file}
```
- From distant to local
```shell script
scp {user}@{distant_machine_ip}:{distant_path_to_file} {desired_local_path}
```

**Remove ssh known_hosts entry**
```
ssh-keygen -R {hostname}
```

**Setup a ssh socks proxy and use it with chromium**
1. Setup the connection
```bash
ssh {user}@{ip} -D {local_port}
```
2. Start chromium with the proper flag
```bash
chromium --proxy-server="socks5://localhost:{local_port}"
```

**Forward SSH agent to remote machine**
1. Add RSA or DSA identities to the authentication agent
`ssh-add {path_to_identify:optional}`
2. Connect to the remote server
`ssh -A {user}@{host}`
3. Check if it works by calling github (ur key must be known by GitHub ofc)
`ssh -T git@github.com`


