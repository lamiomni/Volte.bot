const { Composer } = require('micro-bot');
const Sequelize = require('sequelize')

const app = new Composer()

app.getMe().then((bot_informations) => {
    app.options.username = bot_informations.username;
    console.log("Server has initialized bot nickname. Nick: "+bot_informations.username);
});

const sequelize = new Sequelize(process.env.DATABASE_URL, { 
    dialect:'postgres',
    dialectOptions: { ssl: true }
})

app.command('start', ({ from, reply }) => {
    console.log('start', from)
    return reply('Welcome!')
})

app.hears('hi', (ctx) => ctx.reply('Hey there!'))
app.on('sticker', (ctx) => ctx.reply('👍'))
app.hears('pikachu', (ctx) => ctx.reply('Wesh!!'))
app.hears('testdb', (ctx) => 
{
    sequelize
        .authenticate()
        .then(() => {
            ctx.reply('Connection has been established successfully.')
        })
        .catch(err => {
            ctx.reply('Unable to connect to the database:' + err)
        })
})
module.exports = app