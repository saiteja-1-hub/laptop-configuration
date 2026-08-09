const PriceHistory =
    require("../models/PriceHistory");

const historyService = {

    getAll: async () => {
        return await PriceHistory.getAll();
    },

    getByComponentId: async (componentId) => {
        return await PriceHistory.getByComponentId(
            componentId
        );
    }
};

module.exports = historyService;