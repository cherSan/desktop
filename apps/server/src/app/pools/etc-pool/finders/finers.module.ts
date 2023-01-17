import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {
  POOL_REST_CONNECTION_URL,
  POOL_REST_CONNECTION_URL_VALUE,
  POOL_REST_TIMER_UPDATE,
  POOL_REST_TIMER_UPDATE_VALUE
} from "../contants/connection.constants";
import {PoolETCFindersService} from "./finders.service";
import {PoolETCFindersResolver} from "./finders.resolver";
import {PubSubService} from "../../../utils/pubsub.service";

@Module({
  imports: [HttpModule],
  providers: [
    PoolETCFindersService,
    PoolETCFindersResolver,
    PubSubService,
    {
      provide: POOL_REST_TIMER_UPDATE,
      useValue: POOL_REST_TIMER_UPDATE_VALUE
    },
    {
      provide: POOL_REST_CONNECTION_URL,
      useValue: POOL_REST_CONNECTION_URL_VALUE
    }
  ]
})
export class PoolETCFindersModule {
}
