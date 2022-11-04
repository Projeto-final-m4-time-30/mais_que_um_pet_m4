import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl:
          process.env.DATABASE_URL === "production"
            ? { rejectUnauthorized: false }
            : false,
        synchronize: false,
        logging: true,
        entities:
          process.env.DATABASE_URL === "production"
            ? ["dist/src/entities/*.js"]
            : ["src/entities/*.ts"],
        migrations:
          process.env.DATABASE_URL === "production"
            ? ["dist/src/migrations/*.js"]
            : ["src/migrations/*.ts"],
      }
);

export default AppDataSource;
