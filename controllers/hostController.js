const Home = require('../models/home');


exports.getAddHome = (req, res, next) => {
    res.render('host/edit-home', { pageTitle: 'Add Home to airbnb', currentPage: 'addHome', editing: false });
}
exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
    Home.findById(homeId).then(home => {
        if (!home) {
            console.log('home not found for the given id');
            return res.redirect('/host/host-home-list');
        }
        console.log(homeId, editing, home);
        res.render('host/edit-home', {
            pageTitle: 'Edit Home',
            currentPage: 'host-homes',
            editing: editing,
            home: home
        });
    })

}
exports.getHostHomes = (req, res, next) => {
    Home.fetchAll().then(registeredHomes => { res.render('host/host-home-list', { registeredHomes: registeredHomes, pageTitle: ' Host Homes List', currentPage: 'host-homes' }) });

}
exports.postAddHome = (req, res, next) => {
    const { houseName, price, location, rating, photoUrl, description } = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl, description);
    home.save().then(() =>
        console.log('home added successfully'));
    res.redirect('/host/host-home-list')

}
exports.postEditHome = (req, res, next) => {
    const { houseName, price, location, rating, photoUrl, description, id } = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl, description, id);
    home.save();
    res.redirect('/host/host-home-list');
}
exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.deleteById(homeId)
        .then(() => res.redirect('/host/host-home-list'))
        .catch(err => {
            console.log('error occured while deleting', err)
        })
}
