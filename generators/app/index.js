const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  async prompting() {
    this.log(yosay('Welcome to the Experity Angular App Generator'));
    //this.log('This generator will ')

    this.answers = await this.prompt([
      {
        type: "input",
        name: "appName",
        message: "App name (default in parentheses):",
        default: this.appname
      }
    ]);

    await this.promptUntilValidName();

    let formattingOk = true;

    // if (this.answers.appName !== formattedName) {
    //   formattingOk = await this.prompt([
    //     {
    //       type: "confirm",
    //       message: "breh"
    //     }
    //   ]);
    // }

    this.log('format: ' + formattingOk);
  }

  writing() {

    // this.fs.copyTpl(
    //   this.sourceRoot(),
    //   this.destinationRoot(),
    //   { appName: this.answers.appName }
    // );

    // // Copy all dotfiles
    // this.fs.copy(
    //   this.templatePath('./.*'),
    //   this.destinationRoot(),
    //   { appName: this.answers.appName }
    // );

    // this.setUpVsCodeFiles();
  }

  install() {
    // this.spawnCommandSync('dotnet', ['build']);
    // this.spawnCommandSync('npm', ['install'], { cwd: './ClientApp' });
    // this.spawnCommandSync('ng', ['build'], { cwd: './ClientApp' });
    // this.spawnCommandSync('code', ['.']);
  }

  async promptUntilValidName() {
    let formattedName = this.formatAppName(this.answers.appName);
    let errorMessage = this.validateAppName(formattedName);

    while (errorMessage) {
      this.log(`Invalid app name: ${errorMessage}`);

      this.answers = await this.prompt([
        {
          type: "input",
          name: "appName",
          message: "App name (default in parentheses):",
          default: this.appname
        }
      ]);

      formattedName = this.formatAppName(this.answers.appName);
      errorMessage = this.validateAppName(formattedName);
    }
  }

  validateAppName(appName) {
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

  formatAppName(appName) {
    let noWhiteSpace = appName.split(' ').join('-');

    // as of 7/2019, this is our naming standard
    if (!noWhiteSpace.endsWith('--ui')) {
      noWhiteSpace.concat('--ui');
    }

    return noWhiteSpace.toLowerCase();
  }

  setUpVsCodeFiles(){
    this.fs.copy(
      this.templatePath('./.vscode/'),
      this.destinationPath('./.vscode/'),
      { appName: this.answers.appName }
    );
  }
};