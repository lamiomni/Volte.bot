const { Composer } = require('micro-bot');
const Sequelize = require('sequelize')

const app = new Composer()
const sequelize = new Sequelize(process.env.DATABASE_URL, { 
    dialect:'postgres',
    dialectOptions: { ssl: true }
})

app.command('start', ({ from, reply }) => {
    console.log('start', from)
    return reply('Welcome!')
})

// Auth middleware
app.use((ctx, next) => {
    ctx.state.role = getUserRole(ctx.message) 
    return next()
  })
  
// On
app.on('text', (ctx) => ctx.reply(`Hello ${ctx.state.role}`))
app.on('sticker', (ctx) => ctx.reply('👍'))

// Hears
app.hears(/hi/i, (ctx) => ctx.reply('Hey there!'))
app.hears(/pikachu/i, (ctx) => ctx.reply('Wesh!!'))
app.hears(/testdb/i, (ctx) => 
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