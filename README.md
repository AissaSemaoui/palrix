# PALRIX : The AI Palette Generator SAAS

#### The project is in progress and will be available for launch soon


##### steps to install

- fill in environment variables, env.ts file

- ``` npm install ```
- ``` npm run db:generate ```
- ``` npm run db:push ```
- ``` npm run dev ``` 

#### for auth: 
since we're using webhooks, you need to create an ngrok account and get a link to forward requests into localhost

setup create/update/delete user webhooks and use the ngrok link with webhook path