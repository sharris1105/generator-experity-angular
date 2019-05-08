var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "App name (default in parentheses):",
        default: this.appname
      }
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
      this.templatePath('./'),
      this.destinationRoot(),
      { appName: this.answers.name }
    );

    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('./.*'),
      this.destinationRoot(),
      { appName: this.answers.name }
    );

    this.fs.copy(
      this.templatePath('./.vscode/'),
      this.destinationPath('./.vscode/')
    );
  }

  // install() {
  //   this.npmInstall();
  // }
};