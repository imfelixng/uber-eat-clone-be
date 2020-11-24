import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDTO } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

@Resolver(of => Restaurant)
export class RestaurantResolver {

    constructor(private readonly restaurantService: RestaurantService) {}

    @Query(returns => [Restaurant])
    restaurants(): Promise<Restaurant[]> {
        return this.restaurantService.getAll();
    }

    @Mutation(returns => Boolean)
    async createRestaurant(
        @Args('input') createRestaurantDTO: CreateRestaurantDTO,
    ): Promise<boolean> {
        try {
            await this.restaurantService.createRestaurant(createRestaurantDTO);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

