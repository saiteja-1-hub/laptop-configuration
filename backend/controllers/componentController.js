const componentService =
    require("../services/componentService");

exports.getComponents = async (req, res, next) => {

    try {

        const components =
            await componentService.getAll();

        res.json({
            success: true,
            data: components
        });

    } catch (error) {
        next(error);
    }
};


exports.getComponent = async (req, res, next) => {

    try {

        const component =
            await componentService.getById(
                req.params.id
            );

        res.json({
            success: true,
            data: component
        });

    } catch (error) {
        next(error);
    }
};


exports.createComponent = async (req, res, next) => {

    try {

        const component =
            await componentService.create(req.body);

        res.status(201).json({
            success: true,
            message: "Component created successfully",
            data: component
        });

    } catch (error) {
        next(error);
    }
};


exports.updateComponent = async (req, res, next) => {

    try {

        const component =
            await componentService.update(
                req.params.id,
                req.body
            );

        res.json({
            success: true,
            message: "Component updated successfully",
            data: component
        });

    } catch (error) {
        next(error);
    }
};


exports.deleteComponent = async (req, res, next) => {

    try {

        await componentService.delete(
            req.params.id
        );

        res.json({
            success: true,
            message: "Component deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};