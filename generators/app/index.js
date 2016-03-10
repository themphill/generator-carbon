var generators = require('yeoman-generator');
var chalk = require('chalk');
var templates = [
    {
        src: 'Bootstrap.php',
        dest: 'Bootstrap.php',
        template: true
    },
    {
        src: 'Gruntfile.js',
        dest: 'Gruntfile.js',
        template: false
    },
    {
        src: 'package.json',
        dest: 'package.json',
        template: true
    },
    {
        src: 'IndexController.php',
        dest: 'controllers/IndexController.php',
        template: true
    },
    {
        src: 'index.phtml',
        dest: 'views/scripts/index/index.phtml',
        template: true
    },
    {
        src: 'app.js',
        dest: 'resources/js/app.js',
        template: false
    },
    {
        src: 'kissMetrics.js',
        dest: 'resources/js/kissMetrics.js',
        template: false
    },
    {
        src: 'namespaces.js',
        dest: 'resources/js/namespaces.js',
        template: true
    },
    {
        src: 'collection.js',
        dest: 'resources/js/collections/collection.js',
        template: true
    },
    {
        src: 'model.js',
        dest: 'resources/js/models/model.js',
        template: true
    },
    {
        src: 'router.js',
        dest: 'resources/js/routers/router.js',
        template: true
    },
    {
        src: 'view.js',
        dest: 'resources/js/views/view.js',
        template: true
    },
    {
        src: 'main.hbs',
        dest: 'resources/js/templates/main.hbs',
        template: true
    },
    {
        src: 'main.less',
        dest: 'resources/less/main.less',
        template: false
    }
];

var CarbonGenerator = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('appName', {type: String, required: false});
    },

    initializing: function () {
        // exit if the user is outside of CRBN
        if (!this.destinationRoot().includes('CRBN')) {
            this.env.error(chalk.red('In order to generate a Carbon app, you have to be somewhere in /CRBN.'));
        }

        if (this.appName) {
            this.namespace = this.appName.toLowerCase();
            this.appRoot   = 'application/modules/' + this.namespace + '/';

            this.skipPrompt = true;
        }
    },

    prompting: function () {
        if (this.skipPrompt) {
            return;
        }

        this.log(chalk.green('Welcome to the marvelous Carbon App generator!'));

        var done    = this.async(),
            prompts = [{
                type: 'input',
                name: 'appName',
                message: chalk.cyan('Enter the name of your application as you\'d like to see it displayed (e.g. Sourcetrak, IVR, etc.)'),
                default: 'MyApp'
            }];

        this.prompt(prompts, function (responses) {
            this.appName   = responses.appName;
            this.namespace = responses.appName.toLowerCase();
            this.appRoot   = 'application/modules/' + this.namespace + '/';

            done();
        }.bind(this));
    },

    // configuring: function () {
    //     this.log('configuring');
    // },

    writing: function () {
        templates.forEach((file) => {
            var fromPath = this.templatePath(file.src),
                toPath   = this.destinationPath(this.appRoot + file.dest),
                args     = [fromPath, toPath],
                copyFn   = file.template ? this.fs.copyTpl : this.fs.copy,
                data     = {
                    appName:   this.appName,
                    namespace: this.namespace
                };

            if (file.template) {
                args.push(data);
            }

            copyFn.apply(this.fs, args);
        });
    },

    install: function () {
        var options = {
                cwd: this.appRoot
            };

        this.runInstall('npm', '', options, () => {
            // generate prod assets and lock down deps
            this.spawnCommandSync('npm', ['run', 'appInit'], options);
        });
    },

    end: function () {
        this.log(chalk.green('You did it! Your app is ready to go.'));
    }
});

module.exports = CarbonGenerator;
