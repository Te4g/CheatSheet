**Create a small server with ubuntu image**
```shell script
openstack server create --flavor s1-2 --image "Ubuntu 22.04" --key-name {key_name} --network Ext-Net {server_name}
```
**List flavors in ascending order by CPU & RAM
```bash
openstack flavor list --sort-column VCPUs --sort-column RAM
```
