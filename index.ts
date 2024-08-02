import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolver/index.resolver";
import { requireAuth } from "./middlewares/auth.middleware";

const startServer = async () => {
  dotenv.config();
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  // Connect database
  database.connect();

  // Graphql
  app.use("/graphql", requireAuth);

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    context: ({ req }) => {
      return { ...req }
    }
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql"
  });

  app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
  });

  app.listen(port, () => {
    console.log(`App listening port on ${port}`);
  })
}

startServer();