const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.setUpVsCodeFiles = function () {
      this.fs.copy(
        this.templatePath('./.vscode/'),
        this.destinationPath('./.vscode/'),
        { appName: this.answers.name }
      );
    }
  }

  async prompting() {
    this.log(yosay('Welcome to the Experity Angular App Generator'));
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "App name:",
        default: this.appname
      },
      {
        type: "list",
        name: "uiFramework",
        message: "Select UI framework",
        choices: [
          "Angular Material",
          "DevExtreme"
        ]
      },
      {
        type: "confirm",
        name: "includeAuth",
        message: "Include Authentication?",
        default: true
      },
      {
        type: "list",
        name: "ide",
        message: "Select IDE (you can switch later)",
        choices: [
          "VS Code",
          "Visual Studio"
        ]
      },
    ]);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('./.vs2017/AppTemplate.csproj'),
      this.destinationPath(`./${this.answers.name}.csproj`),
      { appName: this.answers.name }
    );

    this.fs.copyTpl(
      this.templatePath('./.vs2017/AppTemplate.sln'),
      this.destinationPath(`./${this.answers.name}.sln`),
      { appName: this.answers.name }
    );

    this.fs.copyTpl(
      this.sourceRoot(),
      this.destinationRoot(),
      { appName: this.answers.name }
    );

    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('./.*'),
      this.destinationRoot(),
      { appName: this.answers.name }
    );

    this.setUpVsCodeFiles();
  }

  install() {
    this.spawnCommandSync('dotnet', ['build']);
    this.spawnCommandSync('npm', ['install'], { cwd: './ClientApp' });
    this.spawnCommandSync('ng', ['build'], { cwd: './ClientApp' });
    this.spawnCommandSync('code', ['.']);
  }
};