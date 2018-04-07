/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions, unless overridden.       *
     * (`true` allows public access)                                            *
     *                                                                          *
     ***************************************************************************/

    '*': 'IsAuthenticated',

    UserController : {
        'login' : true,
        'gitlabCallback' : true
    },

    ProjectController: {
        'create' : ['IsAuthenticated','IsGitlabAdmin'],
        'list' : ['IsAuthenticated'],
        'delete': ['IsAuthenticated','IsGitlabAdmin'],
        'update': ['IsAuthenticated','IsGitlabAdmin'],
        'get': ['IsAuthenticated']
    },

    GitlabController : {
        'projects': ['IsAuthenticated','IsGitlabAdmin']
    }
};