/**
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 * https://sailsjs.com/config/routes
 */

module.exports.routes = {
    'get /user' : 'UserController.index',
    'post /user' : 'UserController.login',
    'get /user/login' : 'UserController.login',
    'get /user/logout' : 'UserController.logout',
    'get /user/gitlabCallback': 'UserController.gitlabCallback',

    'POST  /project' : 'ProjectController.create',

    'get /project/:id' : 'ProjectController.get',
    'get /project/' : 'ProjectController.list',
    'patch /project/:id' : 'ProjectController.update',
    'delete /project/:id' : 'ProjectController.delete',
    'POST /project/:id/hook/create' : 'HookController.create',
    'POST /project/:id/hook/remove' : 'HookController.remove',
    'get /project/:id/hook' : 'HookController.check',

    'POST /project/hook' : 'HookController.run',

    'post /stagings:id' : 'StagingController.create',
    'get /staging/:id/recreate' : 'StagingController.recreate',
    'get /staging/:id/stop' : 'StagingController.stop',
    'get /staging/:id/start' : 'StagingController.start',

    'get /gitlab/projects': 'GitlabController.projects',

    'get /docker/images': 'DockerController.images',
};