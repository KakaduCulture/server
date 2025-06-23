const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Cart",
    tableName: "Carts",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        user_id: {
            type: "int",
        },
        name_product: {
            type: "varchar",
        },
        product_id: {
            type: "int"
        },
        price: {
            type: "int"
        },
        imageUrl: {
            type: "varchar"
        },

    },
});