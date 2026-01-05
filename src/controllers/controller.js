const bcrypt = require('bcryptjs');
const User = require('../models/User');
const gameService = require('../services/gameService');
const crypto = require('crypto');

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

    const gameId = crypto.randomUUID();
    const firstWord = gameService.drawWord();
    console.log(gameId)

    req.session.game = {
        gameId,
        playerId : req.session.user.id,
        nickname: req.session.user.nickname,
        currentWord: firstWord,
        score: 0,
        history: [firstWord],
        typed: [],
        startedAt: Date.now()
    }

    console.log()

    res.json({
        word: firstWord,
        gameId
    });
}


exports.valide = (req, res) => {
    const word = req.body.word
    const validate = gameService.wordValide(req.session.game)

}

exports.drawWord = (req, res) => {
    const word = gameService.drawWord()
    if(!req.session.game){
        const game = {
            currentWord: word,
            history : [word]
        }
        req.session.game = game
        return res.json(game)
    }
    const game = req.session.game

    game.currentWord = word
    game.history.push(word)

    res.json(game)
}

exports.updateGame = (req, res) => {
    const word = req.body.typed

    res.json(word)
}

exports.restore = (req, res) => {
    const {gameId} = req.body;
    const game = req.session.game

    console.log(gameId)
    console.log(game.gameId)

    if(!gameId) {
        return res.status(400).json({
            error: "gameId é obrigatório no corpo da requisição."
        });
    }

    if(!game) {
        return res.status(404).json({
            error: "Nenhum jogo ativo na sessão."
        });
    }
    
if (game.gameId != gameId) {
        return res.status(403).json({
            error: "ID do jogo não corresponde ao da sessão."
        });
    }

    return res.json(game);
}

exports.eraseData = (req, res) => {
    delete req.session.game
    res.json({sucess: true})
}
