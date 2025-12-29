---
title: Symfony
---

## PHP cs-fixer installation

```bash
mkdir -p tools/php-cs-fixer
composer require --dev --working-dir=tools/php-cs-fixer friendsofphp/php-cs-fixer

cat <<EOF> .php-cs-fixer.php
<?php

\$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__.'/src')
;

\$config = new PhpCsFixer\Config();
return \$config->setRules([
        '@Symfony' => true,
    ])
    ->setFinder(\$finder)
;
EOF

cat <<EOF>> .gitignore
/tools/php-cs-fixer/vendor/
/.php-cs-fixer.cache
EOF
```

## Maker bundle
### make:controller to a custom directory
```bash
bin/console make:controller "\\MyDirectory\\MySubDir\\MyController"
```

## Process
### Run a command in a background process
```php
$process = Process::fromShellCommandline('nohup php bin/console app:my-command > var/log/command.log 2>&1 &');        
$process->run();
```
