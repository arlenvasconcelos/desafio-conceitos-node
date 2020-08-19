Essa aplicação tem como objetivo entender os conceitos de node lecionados no nível do Bootcamp GoStack, da Rocketseat.

Rotas da aplicação

    POST /repositories: A rota recebe title, url e techs dentro do corpo da requisição, sendo a URL o link para o github desse repositório. Ao cadastrar um novo projeto, ele é armazenado dentro de um objeto no seguinte formato: { id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 }; O ID é um UUID, e os likes sempre iniciam com 0.

    GET /repositories: Rota que lista todos os repositórios;

    PUT /repositories/:id: Rota que altera apenas o title, a url e as techs do repositório que possue o id igual ao id presente nos parâmetros da rota;

    DELETE /repositories/:id: A rota deleta o repositório com o id presente nos parâmetros da rota;

    POST /repositories/:id/like: A rota aumenta o número de likes do repositório específico escolhido através do id presente nos parâmetros da rota. A cada chamada dessa rota, o número de likes é aumentado em 1;
