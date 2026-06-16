const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../models/User');
const gameService = require('../services/gameService');
const userService = require('../services/userService');

exports.paginaInicial = (req, res) => {
    return res.render('game')
}

exports.registrar = (req, res) => {
    return res.render('register')
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
        return res.redirect('/login')
    } catch (e){
        console.error(`Erro ao criar user> ${e}`)
        res.redirect('/register')
        return
    }
    
}

exports.login = (req, res) => {
    return res.render('login')
}

exports.postLogin = async (req, res) => {
    const {login, password} = req.body;

    const user = await User.findOne({nickname: login});
    if(!user){
        req.session.error = 'O usuário inserido não existe.';
        return res.redirect('/login')
    }

    const senhaValida = await bcrypt.compare(password, user.password);

    if(!senhaValida){
        req.session.error = 'A senha inserida é inválida.';
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

exports.recovery = (req, res) => {
    res.render('recovery')
}

exports.recoveryRedirect = async (req, res) => {
    const email = req.body.email;
    if(!email) {
        return res.status(400).json({ success: false, message: 'E-mail obrigatório.' });
    }

    const user = await userService.findUser({ email });
    if(user){
        const token = await userService.recoveryUser(user);
        const sendEmail = await userService.sendEmail(user.email, user.nickname, token);
        if(sendEmail){
            return res.render('recoveryRedirect');
        } else {
            return res.render('recovery', {error: "Houve um erro ao enviar o e-mail, tente novamente mais tarde."});
        }
    }

    return res.render('recoveryRedirect');
}

exports.resetPassword = (req, res) => {
    res.render('resetPassword')
}

exports.start = (req, res) => {
    if (req.session.game) {
        return res.json({
            word: req.session.game.currentWord,
            gameId: req.session.game.gameId
        });
    }

    const gameId = crypto.randomUUID();
    const firstWord = gameService.drawWord();
    req.session.game = {
        gameId,
        playerId: req.session.user.id,
        nickname: req.session.user.nickname,
        currentWord: firstWord,
        score: 0,
        history: [firstWord],
        typedHistory: [],
        startedAt: Date.now()
    };

    res.json({
        word: firstWord,
        gameId
    });
};

exports.valide = (req, res) => {
    const word = req.body.word
    const validate = gameService.wordValide(req.session.game)
    res.json({})
}

exports.increaseList = (req, res) => {
    const userList = req.body.list
    if (!req.session.game) {
        return res.status(400).json({
            error: "Game não iniciado"
        });
    }
    let newWordList = []

    for(let i = 10; i > 0; i--){
        newWordList.push(gameService.drawWord())
    }
    userList.push(newWordList)
    return res.json({newWordList})
}

exports.eraseData = (req, res) => {
    delete req.session.game
    res.json({success: true})
}

exports.getUser = (req, res) => {
    let id
    let user
    if(req.session.user){
        id = req.session.user.id 
        user = req.session.user.nickname
    } else{
        id = crypto.randomUUID()
        user = "Guest"
    }
    
    console.log(id, user)
    res.json({
        id: id,
        user: user
    })
}

exports.checkToken = async (req, res) => {
    if(typeof(req.body.token) === "string" && req.body.token.trim().length > 0){
        let token = req.body.token;
        const user = await userService.findUser({ token })
        
        if(user){
            return res.status(200).json({success: true, user: {email: user.email, nickname: user.nickname}})
        } else{
            return res.status(400).json({success: false})
        }
    } else{
        return res.status(400).json({success: false})
    }
}

exports.setPassword = async (req, res) => {
    if(typeof(req.body.token) === "string" && req.body.token.trim().length > 0 && typeof(req.body.password) === "string" && req.body.password.length > 0) {
        const token = req.body.token;
        const password = req.body.password;
        try{
            const send = await userService.setPassword({password, token})
            if(send.success){
                return res.status(200).json({success: true})
            } else{
                return res.status(400).json({success: false})
            }
        } catch(e){
            return res.status(500).json({success: false})
        }
    } else{
        return res.status(400).json({success: false})
    }
}
