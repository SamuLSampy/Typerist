const User = require('./../models/User')
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const { Resend } = require('resend')
const resend = new Resend(process.env.RESEND_SECRET)

exports.findUser = async ({ email, token })=>{
    if(token){
        try{
            const user = await User.findOne({
                passwordResetToken: token,
                passwordResetExpires: { $gt: new Date() }}
            )                       
            return user
        } catch(e){
            console.error('Error finding user by token: ', e.message)
            return
        }
    } else{
        try{
            const user = await User.findOne({email})
            return user
        } catch(e){
            console.error('Error finding user by email: ', e.message)
            return
        }
    } 
}

exports.recoveryUser = async (user)=>{
        const token = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 20 * 60 * 1000;
        await user.save();
        return token
}

exports.sendEmail = async (email, nickname, token)=>{
    const recoveryLink = `https://typerist.online/reset-password?token=${token}`;
    try{
        const { data, error } = await resend.emails.send({
            from: 'Typerist <suporte@typerist.online>',
            to: [email],
            subject: 'Recuperar Senha',
            html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #581c87;">Typerist</h2>
            <p>Olá, ${nickname}!</p>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
            <p>Para escolher uma nova senha, clique no botão abaixo:</p>
            
            <div style="text-align: center; margin: 30px 0;">
            <a href="${recoveryLink}" 
            style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Redefinir Minha Senha
            </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
            ⚠️ <strong>Importante:</strong> Este link é válido por apenas <strong>20 minutos</strong>. Se o prazo expirar, você precisará solicitar um novo link.
            </p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
            Se você não solicitou a alteração de senha, pode ignorar este e-mail com segurança.
            </p>
            </div>`,
        });
        
        if (error) {
            console.error({ error });
            return false
        }
        return true
    } catch(e){
        console.error('E-mail send error: ', e.message);
        return false
    }
}

exports.setPassword = async ({password, token}) => {
    const hash = await bcrypt.hash(password, 10);
    try{
        const user = await User.findOne(({
            passwordResetToken: token,
            passwordResetExpires: { $gt: new Date() }
            }))
        if(user){
            user.password = (hash)
            user.passwordResetExpires = undefined;
            user.passwordResetToken = undefined;
            await user.save()

            return {success: true}
        } else{
            return {success: false}
        }
    } catch(e){
        console.error("Password change error: ", e)
        return {success: false}
    }
}