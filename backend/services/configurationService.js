const LaptopConfiguration =
    require("../models/LaptopConfiguration");

const pricingService =
    require("./pricingService");

const configurationService = {

    create: async (data, userId) => {

        const {
            configuration_name,
            components
        } = data;

        if (!configuration_name) {
            throw new Error(
                "Configuration name is required"
            );
        }

        if (!Array.isArray(components) ||
            components.length === 0) {

            throw new Error(
                "At least one component is required"
            );
        }

        const componentIds =
            components.map(component =>
                component.component_id
            );

        const pricing =
            await pricingService
                .calculateConfigurationPrice(componentIds);

        const configurationId =
            await LaptopConfiguration.create(
                configuration_name,
                pricing.totalPrice,
                userId
            );

        for (const component of pricing.components) {

            await LaptopConfiguration.addItem(
                configurationId,
                component.id,
                component.price,
                component.name,
                component.component_type
            );
        }

        return await LaptopConfiguration
            .getById(configurationId);
    },

    getAll: async () => {

        return await LaptopConfiguration.getAll();
    },

    getById: async (id) => {

        const configuration =
            await LaptopConfiguration.getById(id);

        if (!configuration) {
            throw new Error(
                "Configuration not found"
            );
        }

        return configuration;
    },

    delete: async (id) => {

        const configuration =
            await LaptopConfiguration.getById(id);

        if (!configuration) {
            throw new Error(
                "Configuration not found"
            );
        }

        return await LaptopConfiguration.delete(id);
    }
};

module.exports = configurationService;