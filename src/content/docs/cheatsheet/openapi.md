---
title: OpenAPI
---

### Generate PHP Client from OpenAPI spec
In this example we have `openapi.yml` as the spec file in the current directory, the lib will be generated in `out/php-client` directory.
@see https://openapi-generator.tech/
```bash
docker run --rm -v $PWD:/local openapitools/openapi-generator-cli generate -i /local/openapi.yml -g php -o /local/out/php-client --additional-properties=enumUnknownDefaultCase=true,library=psr-18,variableNamingConvention=camelCase
```
