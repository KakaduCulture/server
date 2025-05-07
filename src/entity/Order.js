const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Order",
    tableName: "order",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        userId: {
            type: "int",
        },
        address: {
            type: "varchar",
            nullable: true, 
        },
        mobileNumber: {
            type: "varchar",
            nullable: true, 
        },
        email: {
            type: "varchar",
            nullable: true, 
        },
        payment: {
            type: "int",
        }
        

    },
});