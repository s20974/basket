const config = require('../config/auth/key')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const PlayerRepository = require('../repository/sequelize/PlayerRepository')

exports.login = (req, res) => {
    const phone = req.body.phone
    const password = req.body.password

    PlayerRepository.findByPhone(phone)
        .then(user=>{
            if(!user){
                return res.status(401).send({message: "bad phone or password"})
            }

            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if(!isEqual){
                        return res.status(401).send({message: "bad phone or password"})
                    }
                    const token = jwt.sign(
                        {
                            phone: user.phone,
                            password: user.password,
                            name: user.name,
                            surname: user.surname,
                            role: user.role,
                        },
                        config.secret,
                        {expiresIn: '1h'}
                    )
                    res.status(200).json({token: token, userId: user._id, name: user.name, surname: user.surname, role: user.role,})
                }).catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}