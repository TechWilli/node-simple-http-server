const http = require('http')
const url = require('url')
const fs = require('fs')

const PORT = 3000

const server = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' })

    const urlInfo = url.parse(req.url, true)

    fs.readFile('form.html', (error, data) => {
        if (error) {
            throw new Error(error)
        }

        const { name, age, job } = urlInfo.query // pegando os valores para cada input (os nomes são os que passei no "name" dos inputs no template)
        
        if (!name && !age && !job) {
            // se não tiver os dados do formulário, enviar o formulário para preenchimento
            res.write(data)
        } else {
            // caso tenham as infos, mostrá-las em tela
            res.write(`<h1>Infos do usuario:</h1><p>${name}<\p><p>${age}<\p><p>${job}<\p>`)
        }

        // no final é preciso encerrar a requisição feita
        res.end()

    })
})

server.listen(PORT, () => {
    console.log(`Servidor ta de pé! na porta ${PORT}`)
})