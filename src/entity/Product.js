const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Product",
    tableName: "Products",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            unique: true,
        },
        price: {
            type: "varchar",
        },
        stock: {
            type: "int"
        },
        unit: {
            type: "int"
        },
        imageUrl: {
            type: "varchar"
        },
        description: {
            type: "varchar"
        },
    },
});