# Deployment

- create the postgres service
- create a web service
  - set DATABASE_URL
  - build command

```
npm i && npm run prisma:reset && cd client && npm i && npm run build
```

  - start script

```
node index.js
```