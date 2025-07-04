---
title: Nuxt.js
---

## Create project
```shell script
$ yarn create nuxt-app <project-name>
```
---
## Add modules Auth
1. Install with yarn:
```shell script
$ yarn add @nuxtjs/auth @nuxtjs/axios
```
1. Edit nuxt.config.js:
```shell script
modules: [
  '@nuxtjs/auth'
]
```
1. Setup auth middleware globally in nuxt.config.js
```shell script
router: {
  middleware: ['auth']
}
```
1. Auth strategy example (still in nuxt.config.js)
```shell script
auth: {
  strategies: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          user: { url: '/users/me', method: 'get', propertyName: false },
  }
}
```

?> [Official documentation](https://auth.nuxtjs.org/)

---
