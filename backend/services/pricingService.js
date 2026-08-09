const Component = require("../models/Component");
const calculatePrice = require("../utils/calculatePrice");

const pricingService = {

    calculateConfigurationPrice: async (componentIds) => {

        const components = [];

        for (const id of componentIds) {

            const component = await Component.getById(id);

            if (!component) {
                throw new Error(
                    `Component with id ${id} not found`
                );
            }

            if (component.status !== "Active") {
                throw new Error(
                    `Component ${component.name} is not active`
                );
            }

            components.push(component);
        }

        const totalPrice = calculatePrice(components);

        return {
            components,
            totalPrice
        };
    }
};

module.exports = pricingService;