# PHP
### Set PHP memory limit
```php
echo 'memory_limit = 256M' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini;
```

### Monolog line formatter parser
```php
$pattern = '/\[(?P<datetime>\S+)]\s+(?P<channel>\S+)\.(?P<level_name>\S+):\s+\[(?P<log_id>\S+)\s+(?P<action>.+?)\s+(?P<class>\S+)]\s+(?P<data>\S+)/';

$matches = [];
preg_match($pattern, $log, $matches);
dump($matches); // [
// 'datetime' => '2022-01-01',
// 'channel' => 'app',
// 'level_name' => 'INFO',
// 'log_id' => '123',
// 'action' => 'Hello world',
// 'class' => 'App\Hello',
// 'data' => 'Hello world!'
//]
```
