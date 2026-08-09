const configurationService =
    require("../services/configurationService");


exports.createConfiguration =
    async (req, res, next) => {

        try {

            const userId =
                req.user ? req.user.id : null;

            const configuration =
                await configurationService.create(
                    req.body,
                    userId
                );

            res.status(201).json({
                success: true,
                message:
                    "Configuration created successfully",
                data: configuration
            });

        } catch (error) {
            next(error);
        }
    };


exports.getConfigurations =
    async (req, res, next) => {

        try {

            const configurations =
                await configurationService.getAll();

            res.json({
                success: true,
                data: configurations
            });

        } catch (error) {
            next(error);
        }
    };


exports.getConfiguration =
    async (req, res, next) => {

        try {

            const configuration =
                await configurationService.getById(
                    req.params.id
                );

            res.json({
                success: true,
                data: configuration
            });

        } catch (error) {
            next(error);
        }
    };


exports.deleteConfiguration =
    async (req, res, next) => {

        try {

            await configurationService.delete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "Configuration deleted successfully"
            });

        } catch (error) {
            next(error);
        }
    };