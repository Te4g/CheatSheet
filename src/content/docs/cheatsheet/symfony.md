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
