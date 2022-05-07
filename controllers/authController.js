const PlayerRepository = require('../repository/sequelize/PlayerRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const phone = req.body.phone;
    const password = req.body.password;
    PlayerRepository.findByPhone(phone)
        .then(player => {
            if(!player){
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('login.loginError')
                })
            }   else if(authUtil.comparePassword(password, player.password) === true){
                req.session.loggedUser = player;
                res.redirect('/');
            }   else {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('login.loginError')
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}