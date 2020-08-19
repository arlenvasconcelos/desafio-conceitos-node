const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

//Middlewares
const findRepository = (request, response, next) => {
  const {id} = request.params

  if(repositories.find(repository => repository.id === id))
    return next()

  return response.status(400).json({
      message: "Repository not found"
    })

}

const repositories = [];

/**
 * Index
 * Return a list of repositories
 */
app.get("/repositories", (request, response) => {
  
  const {title} = request.query

  if (title){
    filteredRepositories = repositories.filter(repository => repository.title.includes(title))
    return response.status(200).json(filteredRepositories)
  }
  
  return response.status(200).json(repositories)
});

/**
 * Create
 * Add a new repository
 */

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return response.status(201).json(repository)

});

/**
 * Update
 * Update a repository
 */

app.put("/repositories/:id", findRepository, (request, response) => {
  
  const {id} = request.params
  const {title, url, techs} = request.body
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  const repository = repositories[repositoryIndex];

  const updatedRepository = { 
    ...repository,
    title, 
    url,
    techs
  };

  repositories[repositoryIndex] = updatedRepository;

  return response.status(200).json(updatedRepository)
});

/**
 * Delete
 * Delete a repository
 */

app.delete("/repositories/:id", findRepository, (request, response) => {
  
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send()

});

/**
 * Add Like
 * Add "like" to repository
 */

app.post("/repositories/:id/like", findRepository, (request, response) => {

  const {id} = request.params
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  const repository = repositories[repositoryIndex];

  const updatedRepository = { 
    ...repository,
    likes: repository['likes'] + 1
  };

  repositories[repositoryIndex] = updatedRepository;

  return response.status(200).json(updatedRepository)

});

module.exports = app;
