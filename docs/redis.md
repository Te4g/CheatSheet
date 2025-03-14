# Redis
## Setup Redis for PHP using Docker
1. Update the Dockerfile
```dockerfile
RUN pecl install redis
RUN docker-php-ext-enable redis
```
2. Update the `composer.json` file
```json
  {
    "require": {
        "ext-redis": "*"
    }
  }
```
3. Usage example
- Hello world
    ```php
    $redis = new \Redis([
        'host' => 'tls://my-domain.com',
        'port' => 1234,
        'auth' => ['default', 'password']
    ]);
    
    $redis->set('test', 'Hello world!');
    $data = $redis->get('test')
    
    echo $data // Hello world!;
    ```
- Create a new user with a password and limit access to GET command and keys matching a pattern
    ```php
    $redis->acl('SETUSER',
        'myusername',
        'on',
        '>defineAPassword',
        '~pattern*',
        '+GET'
    );
  ```
  
## Redis commands
### Create a new user
```redis
ACL SETUSER myusername on >defineAPassword ~pattern* +GET
```

### List users
```redis
ACL USERS 
```

### Get user information
```redis
ACL GETUSER myusername
```

### Set a value
```redis
SET my_key my_value
```

### Get a value
```redis
GET my_key
```

### GET all values by pattern in PHP and have the result as an associative array (value is a JSON string)
```php
$redisKeys = $redis->keys('sport_centers:*');
$redis->multi(\Redis::PIPELINE);
foreach ($redisKeys as $key) {
    $redis->get($key);
}
$values = $redis->exec();

$sportCenters = array_combine($redisKeys, array_map(static fn(string $value) => json_decode($value, true, 512, JSON_THROW_ON_ERROR), $values));

```


