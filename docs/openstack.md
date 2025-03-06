**Create a small server with ubuntu image**
```shell script
openstack server create --flavor s1-2 --image "Ubuntu 22.04" --key-name {key_name} --network Ext-Net {server_name}
openstack server create --flavor d2-2 --image "Debian 12 - Docker" --key-name "mac_m1" --network Ext-Net test
```
**List flavors in ascending order by CPU & RAM
```bash
openstack flavor list --sort-column VCPUs --sort-column RAM
```

**Import an existing key pair**
```shell script
openstack keypair create --public-key ~/.ssh/id_rsa.pub {key_name}
```
