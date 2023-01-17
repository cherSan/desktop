import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {MercuriusDriver, MercuriusDriverConfig} from "@nestjs/mercurius";
import {PoolsModule} from "./pools/pools.module";

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: 'apps/server/src/schema.gql',
      graphiql: true,
      subscription: true,
      sortSchema: true
    }),
    PoolsModule
  ],
})
export class AppModule {
}
