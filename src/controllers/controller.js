const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { render } = require('ejs');

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

exports.postLogin = (req, res) => {
    res.render('login')
}