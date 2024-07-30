import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./type-defs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  dotenv.config();
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  // Connect database
  database.connect();
  // Graphql
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
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