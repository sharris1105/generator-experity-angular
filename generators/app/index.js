const Generator = require('yeoman-generator');
const yosay = require('yosay');

// * yeoman docs can be found here https://yeoman.github.io/generator/index.html

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);


    // ! THESE HELPER FUNCTIONS MUST BE DEFINED IN THE CONSTRUCTOR
    // ! Yeoman treats everything outside of the constructor as a runtime task
    // ! and will execute them sequentially, resulting in strange behavior if
    // ! you're unfamiliar with Yeoman. See https://yeoman.io/authoring/running-context.html

    this.promptUntilValidName = async function () {
      let formattedName, errorMessage;

      do {
        if (errorMessage) {
          this.log(`Invalid app name: ${errorMessage}`);
        }

        this.answers = await this.prompt([
          {
            type: "input",
            name: "appName",
            message: "Enter a name for your new app:"
          }
        ]);

        formattedName = this.formatAppName(this.answers.appName);
        errorMessage = this.validateAppName(formattedName);
      } while (errorMessage);

      return formattedName;
    }

    this.isFormattingOk = async function (formattedName) {
      if (this.answers.appName === formattedName) {
        return true;
      }

      this.answers = await this.prompt([
        {
          type: "confirm",
          name: "formattingOk",
          message: `App name has been formatted to \'${formattedName}\'. Ok?`
        }
      ]);

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

    // ! end helper functions
  }

  async prompting() {
    this.log(yosay('Welcome to the Experity Angular App Generator'));


    let formattedName, formattingOk;

    do {
      formattedName = await this.promptUntilValidName();
      formattingOk = await this.isFormattingOk(formattedName);
    } while (!formattingOk);

    this.answers.appName = formattedName;
  }

  writing() {
    this.fs.copyTpl(
      this.sourceRoot(),
      this.destinationPath(`${this.answers.appName}`),
      { appName: this.answers.appName }
    );

    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('./.*'),
      this.destinationPath(`${this.answers.appName}`),
      { appName: this.answers.appName }
    );

    // For some reason, the .vscode files don't copy unless you do it explicitly. Probably user error but code below works
    this.fs.copy(
      this.templatePath('./.vscode/'),
      this.destinationPath(`${this.answers.appName}/.vscode/`)
    );
  }

  install() {
    this.spawnCommandSync('npm', ['install'], { cwd: `${this.answers.appName}` });
    this.spawnCommandSync('git', ['init'], { cwd: `${this.answers.appName}` });
    this.spawnCommandSync('git', ['add', '.'], { cwd: `${this.answers.appName}` });
    this.spawnCommandSync('git', ['commit', '-m', 'initial commit from Yeoman generator'], { cwd: `${this.answers.appName}` });
    this.spawnCommandSync('code', ['.', '-g', 'README.md'], { cwd: `${this.answers.appName}` });
  }
};