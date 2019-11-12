const Generator = require('yeoman-generator');
const yosay = require('yosay');

// * yeoman docs can be found here https://yeoman.github.io/generator/index.html

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    let formattedYamlDashedName = "";
    let formattedYamlPathBaseName = "";

    // ! THESE HELPER FUNCTIONS MUST BE DEFINED IN THE CONSTRUCTOR
    // ! Yeoman treats everything outside of the constructor as a runtime task
    // ! and will execute them sequentially, resulting in strange behavior if
    // ! you're unfamiliar with Yeoman. See https://yeoman.io/authoring/running-context.html

    this.promptUntilValidName = async function () {
      let formattedAppName, errorMessage;

      do {
        if (errorMessage) {
          this.log(`Invalid app name: ${errorMessage}`);
        }

        this.answers = await this.prompt([{
          type: "input",
          name: "appName",
          message: "Enter a name for your new app:"
        }]);

        formattedAppName = this.formatAppName(this.answers.appName);
        errorMessage = this.validateAppName(formattedAppName);
      } while (errorMessage);

      return formattedAppName;
    }

    this.isFormattingOk = async function (formattedName) {
      if (this.answers.appName === formattedName) {
        return true;
      }

      this.answers = await this.prompt([{
        type: "confirm",
        name: "formattingOk",
        message: `App name has been formatted to \'${formattedName}\'. Ok?`
      }]);

      return this.answers.formattingOk;
    }

    this.validateAppName = function (appName) {
      if (appName.length < 5 || appName.length > 30) {
        return 'App name must be between 5 and 30 characters in length.';
      }

      // * https://regex101.com/r/YLblDh/2
      // * the '^' inverts the character set, so anything that's _not_ a-z or '-'
      const invalidCharacters = /[^a-z-]+/gi;

      if (invalidCharacters.test(appName)) {
        return 'App name may only contain \'a-z\' and \'-\'';
      }

      if (appName.toLowerCase().startsWith('pv') ||
        appName.toLowerCase().startsWith('xp') ||
        appName.toLowerCase().startsWith('experity')) {
        return 'App name should describe functionality and will only be seen internally. Avoid PV/Experity prefixes.';
      }

      if (appName.toLowerCase().includes('app')) {
        return 'Avoid using \'app\' in app name. Current naming standard dictates suffixing app name with \'--ui\'.';
      }

      return null;
    }

    this.formatAppName = function (appName) {
      // remove spaces
      appName = appName.split(' ').join('-');

      // convert from camelCase/PascalCase to kebab-case.
      // * lifted from https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
      appName = appName.replace(/([a-z0-9])([A-Z])/g, '$1-$2');

      // as of 7/2019, this is our naming standard
      if (!appName.endsWith('--ui')) {
        appName = appName.concat('--ui');
      }

      return appName.toLowerCase();
    }

    this.formatYamlDashedName = function (appName) {
      let yamlDashedName = appName;

      if (yamlDashedName.endsWith('--ui')) {
        formattedYamlDashedName = yamlDashedName.substring(0, yamlDashedName.length - 4) + '-ui';
      }

      return formattedYamlDashedName;
    }

    this.formatYamlPathBaseName = function (appName) {
      let yamlPathBaseName = appName.toLowerCase();

      if (yamlPathBaseName.endsWith('--ui')) {
        formattedYamlPathBaseName = yamlPathBaseName.substring(0, yamlPathBaseName.length - 4) + 'ui';
      }

      return formattedYamlPathBaseName;
    }

    // ! end helper functions
  }

  async prompting() {
    this.log(yosay('Welcome to the Experity Angular App Generator'));


    let formattedAppName, formattingOk;

    do {
      formattedAppName = await this.promptUntilValidName();
      formattingOk = await this.isFormattingOk(formattedAppName);
    } while (!formattingOk);

    this.formattedYamlDashedName = this.formatYamlDashedName(formattedAppName);
    this.formattedPathBaseName = this.formatYamlPathBaseName(formattedAppName);

    this.answers.appName = formattedAppName;
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('./app'),
      this.destinationPath(`${this.answers.appName}`), {
      appName: this.answers.appName
    }
    );

    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('./app/.*'),
      this.destinationPath(`${this.answers.appName}`), {
      appName: this.answers.appName
    }
    );

    // For some reason, the .vscode files don't copy unless you do it explicitly. Probably user error but code below works
    this.fs.copy(
      this.templatePath('./app/.vscode/'),
      this.destinationPath(`${this.answers.appName}/.vscode/`)
    );

    this.fs.copyTpl(
      this.templatePath('./app/.build'),
      this.destinationPath(`${this.answers.appName}/.build`), {
      dashedName: this.formattedYamlDashedName,
      pathBaseName: this.formattedPathBaseName
    });

    this.fs.copyTpl(
      this.templatePath('./Dockerfile'),
      this.destinationPath(`${this.answers.appName}/Dockerfile`)
    );

    this.fs.copyTpl(
      this.templatePath('./README.md'),
      this.destinationPath(`${this.answers.appName}/README.md`), {
      appName: this.answers.appName
    }
    );

    this.fs.copyTpl(
      this.templatePath('./run.sh'),
      this.destinationPath(`${this.answers.appName}/run.sh`)
    );

    this.fs.copy(
      this.templatePath('./app/.github/'),
      this.destinationPath(`${this.answers.appName}/.github/`)
    );
  }

  install() {
    this.spawnCommandSync('npm', ['install'], {
      cwd: `${this.answers.appName}`
    });
    this.spawnCommandSync('code', ['.', '-g', 'README.md'], {
      cwd: `${this.answers.appName}`
    });
  }
};