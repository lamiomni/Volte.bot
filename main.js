const { Composer } = require('micro-bot');
const Sequelize = require('sequelize')
/*
var http = require("http");

// Keep-alive
setInterval(function() {
    http.get("http://" + process.env.NOW_URL);
}, 2700000); // every 45 minutes
*/

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
app.hears(/random (.+)(\s|$)/i, ({ replyWithPhoto, match }) => {
    //var keywords = match[1].split(' ').join()
    replyWithPhoto('https://source.unsplash.com/320x240/?' + match[1], {caption: 'random ' + match[1]})
})
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
app.hears(/ping/i, async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    return ctx.reply('Response time: ' + ms + ' ms')
  })

module.exports = app