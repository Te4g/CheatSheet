# Wireguard
## Setup client
1. Generate config from firezone
2. Install wireguard on the client machine `sudo apt install wireguard`
3. Copy the config file to `/etc/wireguard/wg0.conf`
4. Run wg-quick command `wg-quick up wg0`
5. If `resolvconf` not found run: `sudo ln -s /usr/bin/resolvectl /usr/local/bin/resolvconf`
6. See the result `sudo wg show`
