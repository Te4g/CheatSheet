---
title: MacOS
---
## Proxy Socks
## Set up a proxy socks
```bash
networksetup -setsocksfirewallproxy wi-fi localhost 7000
```
## Get proxy socks info
```bash
networksetup -getsocksfirewallproxy wi-fi
```
## Enable proxy socks
```bash
networksetup -setsocksfirewallproxystate wi-fi on
```
## Disable proxy socks
```bash
networksetup -setsocksfirewallproxystate wi-fi off
```
