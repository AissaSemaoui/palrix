# Palrix: The AI Palette Generator SaaS

Palrix is an AI-powered palette generator SaaS that creates beautiful, intelligent color palettes for designers, developers, and creative professionals. Built with a unique hybrid architecture combining Next.js frontend with Express.js backend in a single repository.

> [!NOTE]
> This project is in progress and will be available for the launch soon.

#### Architecture
The architecture is quite unique, and it was a bit challenging; I attempted to combine Next.js and an Express server within a single repository to avoid the complexity of managing workspaces and inter-package linking for an MVP. 
The starting point is `src/server/index.ts`. It serves the Express server and the Next.js app.


##### Steps to install

- Fill in environment variables, `environments.ts` file

- ``` npm install ```
- ``` npm run db:generate ```
- ``` npm run db:push ```
- ``` npm run dev ``` 

#### for auth: 
Since we're using webhooks, you need to create an ngrok account and get a link to forward requests to localhost

Set up create/update/delete user clerk webhooks and use the ngrok link for webhook path
