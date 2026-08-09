const Component = require("../models/Component");
const PriceHistory = require("../models/PriceHistory");

const componentService = {

    getAll: async () => {
        return await Component.getAll();
    },

    getById: async (id) => {

        const component = await Component.getById(id);

        if (!component) {
            throw new Error("Component not found");
        }

        return component;
    },

    create: async (data) => {

        if (!data.component_type ||
            !data.name ||
            data.price === undefined) {

            throw new Error(
                "component_type, name and price are required"
            );
        }

        if (Number(data.price) < 0) {
            throw new Error("Price cannot be negative");
        }

        return await Component.create(data);
    },

    update: async (id, data) => {

        const existingComponent =
            await Component.getById(id);

        if (!existingComponent) {
            throw new Error("Component not found");
        }

        if (data.price !== undefined &&
            Number(data.price) < 0) {

            throw new Error("Price cannot be negative");
        }

        const newPrice =
            data.price !== undefined
                ? Number(data.price)
                : existingComponent.price;

        await Component.update(id, {
            component_type:
                data.component_type ||
                existingComponent.component_type,

            name:
                data.name ||
                existingComponent.name,

            brand:
                data.brand !== undefined
                    ? data.brand
                    : existingComponent.brand,

            price: newPrice,

            status:
                data.status ||
                existingComponent.status
        });

        // Save price history only if price changed
        if (newPrice !== existingComponent.price) {

            await PriceHistory.create(
                id,
                existingComponent.price,
                newPrice
            );
        }

        return await Component.getById(id);
    },

    delete: async (id) => {

        const component =
            await Component.getById(id);

        if (!component) {
            throw new Error("Component not found");
        }

        return await Component.delete(id);
    }
};

module.exports = componentService;