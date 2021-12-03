export default class Restaurant {
    constructor(restaurantData) {
        this.id = restaurantData.id;
        this.name = restaurantData.name;
        this.street_address = restaurantData.street_address;
        this.zip_code = restaurantData.zip_code;
        this.city = restaurantData.city;
        this.category = restaurantData.category;
        this.category_label = restaurantData.category_label;
        this.ratings_average = restaurantData.ratings_average;
        this.ratings_count = restaurantData.ratings_count;
        this.profile_picture = restaurantData.profile_picture;
        this.cover_picture = restaurantData.cover_picture;

        this.dishes = [];

        if (restaurantData.dishes.data.length > 0) {
            this.dishes = restaurantData.dishes.data;
        }
    }
}
