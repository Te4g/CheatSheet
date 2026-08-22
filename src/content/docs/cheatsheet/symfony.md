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

## Pop a new Symfony project from my template

### Create the repo

```bash
gh repo create {my_project} --clone --private --template Te4g/symfony-template
cd {my_project}
```

### Run the project

Set `HTTP_PORT` in `.env`, then run:

```bash
make start
```

### Add the user starter (optional)

On a fresh Symfony 8.1 project, immediately after `make start`, run:

```bash
docker compose exec php composer require 'te4g/starter:dev-main' --dev
docker compose exec php vendor/bin/te4g-starter install --no-interaction
docker compose exec php bin/console make:migration
docker compose exec php bin/console doctrine:migrations:migrate --no-interaction
docker compose exec php composer remove 'te4g/starter:dev-main' --dev
```
