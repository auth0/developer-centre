const jwt = require('express-jwt'),
      Client = require('./controllers/client');

const authCheck = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
});

module.exports = function(app) {

  app.get('/api', authCheck, function(req, res) {
    res.json("Welcome to the Api");
  });

  // app.post('/api/login',    User.authenticateUserByEmail);
  // app.post('/api/register', User.registerUser);

  app.get('/api/clients',  Client.getClients);
  // app.get('/api/user/:user_id',    User.getEachUserDetails);
  // app.get('/api/users/:username',  User.getEachUserByUsername);
  // app.put('/api/user/:user_id',    User.updateEachUserDetails);
  app.delete('/api/client/:client_id', Client.deleteClient);

  app.post('/api/client', Client.create);
  // app.post('/api/contact',     Contact.sendMessage);
  // app.post('/api/newsletter',  Newsletter.subscribe);
  // app.post('/api/password',    User.resetUserPassword);

  // app.post('/api/jobs/create', Job.create);
  // app.get('/api/jobs', Job.getAllJobs);

  // app.post('/api/project', Project.shareProject);
  // app.get('/api/project',  Project.getAllProjects);
  // app.get('/api/projects/:projectSlug', Project.getEachProjectDetail);
  // app.delete('/api/project/:id', verifyToken, Project.deleteEachProject);

  // app.post('/api/tutorials/create', verifyToken, Tutorial.create);
  // app.get('/api/tutorials', Tutorial.getAllTutorials);
  // app.get('/api/tutorials/:slug', Tutorial.getEachTutorialDetails);
};