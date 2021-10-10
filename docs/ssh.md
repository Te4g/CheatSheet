**Create SSH keys**
```shell script
ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
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
