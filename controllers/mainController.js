const mainController = {
    
    index: (req, res) => {
        res.render("home");
    },
    registro: (req, res) => {
        res.render("registro");
    },
    login: (req, res) => {
        res.render("login");
    },
};

module.exports = mainController;