const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { render } = require('ejs');
const gameService = require('../services/gameService')

exports.paginaInicial = (req, res) => {
    res.render('game')
    return
}

exports.registrar = (req, res) => {
    res.render('register')
}

exports.postRegistrar = async (req, res) => {
    try{
        const {nickname, email, password} = req.body;
        const hash = await bcrypt.hash(password, 10);
        await User.create({
            nickname,
            email,
            password: hash
        })
    } catch (e){
        console.error(`Erro ao criar user> ${e}`)
        res.redirect('/register')
    }
    res.redirect('/login')
}

exports.login = (req, res) => {
    res.render('login')
}

exports.postLogin = async (req, res) => {
    const { login, password} = req.body;

    const user = await User.findOne({nickname: login});
    if(!user){
        return res.redirect('/login')
    }
    const senhaValida = await bcrypt.compare(password, user.password);

    if(!senhaValida){
        return res.redirect('/login')
    }

    req.session.user = {
        id: user._id,
        email: user.email,
        nickname: user.nickname
    }

    res.redirect('/')
}

exports.logout = (req, res) => {
    req.session.destroy(e => {
        if(e){
            return res.redirect('/')
        }

        res.clearCookie('connect.sid');
        res.redirect('/login')
    })
}

exports.start = (req, res) => {
      if (!req.session.user) {
        return res.status(401).json({ error: 'Login necessário' });
    }

    console.log(req.body);
        const result = gameService.startGame(req.session.user);
        res.json(result);
}

exports.drawWord = (req, res) => {
    
    console.log(req.body);
        const word = gameService.drawWord(req.session.user)
        res.json(word)
}
