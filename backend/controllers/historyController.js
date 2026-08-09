const historyService =
    require("../services/historyService");


exports.getHistory = async (req, res, next) => {

    try {

        const history =
            await historyService.getAll();

        res.json({
            success: true,
            data: history
        });

    } catch (error) {
        next(error);
    }
};


exports.getComponentHistory =
    async (req, res, next) => {

        try {

            const history =
                await historyService
                    .getByComponentId(
                        req.params.componentId
                    );

            res.json({
                success: true,
                data: history
            });

        } catch (error) {
            next(error);
        }
    };