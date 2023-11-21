const Hello = (app) => {
    app.get('/', (req, res) => { res.send("Life is good!") })
    app.get('/hello', (req, res) => { res.send('Hello, World!') })
}
export default Hello;