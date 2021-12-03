export default class Order {
    constructor(orderData) {
        this.first_name = orderData.first_name;
        this.last_name = orderData.last_name;
        this.delivery_street_address = orderData.delivery_street_address;
        this.delivery_zip_code = orderData.delivery_zip_code;
        this.delivery_city = orderData.delivery_city;
        this.delivery_method = orderData.delivery_method ? orderData.delivery_method : 'bike';
        this.items = [];

        if (orderData.items.length > 0) {
            this.items = orderData.items;
        }
    }
}