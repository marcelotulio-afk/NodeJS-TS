import { parse } from 'query-string';
import * as url from 'url';
import { writeFile } from 'fs'; 
import { createServer, IncomingMessage, ServerResponse } from 'http';

// Definicao de porta
const port = 5000


const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    const urlparse = url.parse(request.url ? request.url : '', true);

    var resposta;
    // Implementar código aqui
    const params = parse(urlparse.search ? urlparse.search : '');

    if(urlparse.pathname == '/criar-atualizar-usuario'){
    
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
            if (err) throw err;
            console.log('Saved!');

            resposta = 'Usuario criado/atualizado com sucesso';

            response.statusCode = 200;
            response.setHeader('Content=Type', 'text/plain');
            response.end(resposta);
        });
    }
});

//Execução
server.listen(port, function ()  {
    console.log("Server running on " + port);
});

// localhost:5000/criar-atualizar-usuario?id=123&nome=erik