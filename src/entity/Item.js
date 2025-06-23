const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Item",
    tableName: "item",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        productId: {
            type: "int",
        },
        price: {
            type: "float"
        },
        quantity: {
            type: "int",
        },
        orderId: {
            type: "int",
        },
    },
});