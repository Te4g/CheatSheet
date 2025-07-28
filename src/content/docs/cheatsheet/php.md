---
title: PHP
---
### Set PHP memory limit
```bash
echo 'memory_limit = 256M' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini;
```
### Reset FrankenPHP (supervisord will relaunch the service)
```bash
pkill -9 -f /usr/local/bin/frankenphp
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

### Nginx logs parser
```php
$pattern = <<<'REGEX'
~^
(?<ip>\S+)
\s+-\s+\S+\s+
\[(?<time>[^\]]+)]
\s+
"(?<method>[A-Z]+)\s+(?<uri>\S+)\s+(?<protocol>HTTP/\d\.\d)"
\s+
(?<status>\d{3})
\s+
(?<bytes>\d+)
\s+
"(?<referer>[^"]*)"
\s+
"(?<agent>[^"]*)"
(\s+"(?<req_time>[\d.]+)")?
~x
REGEX;

$matches = [];
preg_match($pattern, $log, $matches);
dump($matches); 
[
  "ip" => "192.168.0.10"
  "time" => "27/Jul/2025:15:26:07 +0000"
  "method" => "GET"
  "uri" => "/example/1"
  "protocol" => "HTTP/1.1"
  "status" => "200"
  "bytes" => "735"
  "referer" => "-"
  "agent" => "Mozilla/5.0"
  "req_time" => "10.23"
]
```

### Generate a backtrace
```php
debug_backtrace(2);
```

### Get the current memory usage
```php
class MemoryUsageService
{
    private int $startMemory;
    private float $startTime;

    public function startMonitoring(): void
    {
        $this->startMemory = memory_get_usage();
        $this->startTime = microtime(true);
    }

    public function endMonitoring(): void
    {
        echo 'Execution time: '.$this->bytesToMegabytes(microtime(true) - $this->startTime)." seconds\n";
        echo 'Memory used: '.$this->bytesToMegabytes(memory_get_usage() - $this->startMemory)." MB\n";
        echo 'Peak memory usage: '.$this->bytesToMegabytes(memory_get_peak_usage())." MB\n";
    }

    private function bytesToMegabytes(int $bytes, int $precision = 2): float
    {
        return round($bytes / 1048576, $precision);
    }
}

class MyClassToMonitor
{
    public function __construct(
    private MemoryUsageService $memoryUsageService
    ) {
    }

    public function myMethod(): void
    {
        $this->memoryUsageService->startMonitoring();
        // Your code here
        $this->memoryUsageService->endMonitoring();
    }
}
```
