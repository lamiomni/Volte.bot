const { Composer } = require('micro-bot');
const Sequelize = require('sequelize')

const app = new Composer()
const sequelize = new Sequelize(process.env.DATABASE_URL, { 
    dialect:'postgres',
    dialectOptions: { ssl: true }
})

// Command
app.command('start', ({ from, reply }) => {
    console.log('start', from)
    return reply('Welcome!')
})
app.command('popcorn', (ctx) => ctx.reply('🍿'))
  
// On
app.on('sticker', (ctx) => ctx.reply('👍'))

// Hears
app.hears(/hi/i, (ctx) => ctx.reply('Hey there!'))
app.hears(/pikachu/i, (ctx) => ctx.reply('Wesh!!'))
app.hears(/random (.+)/i, ({ match, ctx }) => ctx.replyWithPhoto('http://loremflickr.com/320/240/' + match[1], {caption: 'random ' + match[1]}))
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