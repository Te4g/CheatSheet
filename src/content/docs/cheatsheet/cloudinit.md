---
title: Cloud-init
---

## Test a cloud-init file using [multipass](https://canonical.com/multipass)
```bash
    multipass launch --name test --cloud-init my-cloud-init.yaml
    multipass exec test -- tail -f /var/log/cloud-init-output.log
```
