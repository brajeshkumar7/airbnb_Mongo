const Favourite = require('../models/favourite');
const Home = require('../models/home');


exports.getIndex = (req, res, next) => {
    Home.fetchAll().then(registeredHomes => {
        res.render('store/index', { registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currentPage: 'index' })
    })
}
exports.getHomes = (req, res, next) => {
    Home.fetchAll().then(registeredHomes => { res.render('store/home-list', { registeredHomes: registeredHomes, pageTitle: 'Homes List', currentPage: 'Home' }) });

}
exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: 'My Bookings', currentPage: 'bookings' });

}
exports.getFavouriteList = (req, res, next) => {
    Favourite.getFavourites().then(favourites => {
        favourites = favourites.map(fav => fav.houseId);
        Home.fetchAll().then(registeredHomes => {
            const favouriteHomes = registeredHomes.filter(home => favourites.includes(home._id.toString()))
            res.render('store/favourite-list', { favouriteHomes: favouriteHomes, pageTitle: 'My favourites', currentPage: 'favourites' })
        });
    })

}
exports.postDeleteFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    Favourite.deleteById(homeId).then(result => {
        console.log('home added to favourites successfully', result);
    }).catch(err => {
        console.log('error occured while removing from favourites', err);
    }).finally(
        res.redirect('/favourites')
    )
}
exports.addPostFavouriteList = (req, res, next) => {
    const homeId = req.body.id;
    const fav = new Favourite(homeId);
    fav.save().then(result => {
        console.log('home added to favourites successfully', result);
    }).catch(err => {
        console.log('error occured while adding home to favourite', err);
    }).finally(
        res.redirect('/favourites')
    )

}

exports.getHomeDetails = (req, res, next) => {
    //we will get all the variables of the data
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home => {
        if (!home) {
            res.redirect('/homes');
        }
        else {

            res.render('store/home-details', { home: home, pageTitle: 'Home Details', currentPage: 'Home' });
        }
    })

}