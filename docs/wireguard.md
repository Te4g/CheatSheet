# Wireguard
## Setup client
1. Generate config from firezone
2. Install wireguard on the client machine `sudo apt install wireguard`
3. Copy the config file to `/etc/wireguard/wg0.conf`
4. Run wg-quick command `wg-quick up wg0`
5. Install resolvconf if necessary (ubuntu/debian) `sudo apt install resolvconf`
6. See the result `sudo wg show`
