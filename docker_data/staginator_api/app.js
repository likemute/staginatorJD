process.chdir(__dirname);

// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
let sails;
let rc;
try {
    sails = require('sails');
    rc = require('sails/accessible/rc');
} catch (err) {
    console.error('Encountered an error when attempting to require(\'sails\'):');
    return;
}//-•

const path = require('path');
require('dotenv').load();
require('dotenv').load({
    'path': path.resolve(process.cwd(), '.env.default')
});
// Start server
sails.lift(rc('sails'));