const calculatePrice = (components) => {

    return components.reduce((total, component) => {
        return total + Number(component.price);
    }, 0);

};

module.exports = calculatePrice;