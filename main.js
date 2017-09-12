const Telegraf = require('telegraf')
const Sequelize = require('sequelize')

const app = new Telegraf(process.env.BOT_TOKEN)
const sequelize = new Sequelize(process.env.DATABASE_URL, { 
    dialect:'postgres',
    dialectOptions: { ssl: true }
})

app.startWebhook('/secret-path', null, 3000)

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
//app.startPolling()