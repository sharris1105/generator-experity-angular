var Generator = require('yeoman-generator');

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

      const launchJson = {
        "version": "0.2.0",
        "configurations": [
          {
            "name": ".NET Core Launch (silent)",
            "type": "coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "program": `\${workspaceFolder}/bin/Debug/netcoreapp2.2/${this.answers.name}.dll`,
            "args": [],
            "cwd": "${workspaceFolder}",
            "stopAtEntry": false,
            "internalConsoleOptions": "neverOpen",
            "launchBrowser": {
              "enabled": false,
              "args": "${auto-detect-url}",
              "windows": {
                "command": "cmd.exe",
                "args": "/C start ${auto-detect-url}"
              },
              "osx": {
                "command": "open"
              },
              "linux": {
                "command": "xdg-open"
              }
            },
            "env": {
              "ASPNETCORE_ENVIRONMENT": "Development",
              "EncryptionPublicKey": "",
              "KeyFilePath": "",
              "PathBase": ""
            },
            "sourceFileMap": {
              "/Views": "${workspaceFolder}/Views"
            }
          }
        ]
      }

      const tasksJson = {
        "version": "2.0.0",
        "tasks": [
          {
            "label": "build",
            "command": "dotnet",
            "type": "process",
            "args": [
              "build",
              `\${workspaceFolder}/${this.answers.name}.csproj`
            ],
            "problemMatcher": "$msCompile",
            "presentation": {
              "echo": false,
              "reveal": "silent"
            }
          }
        ]
      }

      this.fs.extendJSON(this.destinationPath('./.vscode/launch.json'), launchJson);
      this.fs.extendJSON(this.destinationPath('./.vscode/tasks.json'), tasksJson);
    }
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "App name (default in parentheses):",
        default: this.appname
      },
      // {
      //   type: "list",
      //   name: "ui-framework",
      //   message: "Select UI framework",
      //   choices: [
      //     "Angular Material",
      //     "DevExtreme"
      //   ]
      // },
      // {
      //   type: "confirm",
      //   name: "include-auth",
      //   message: "Include Authentication?",
      //   default: true
      // }
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

  // install() {
  //   this.npmInstall();
  // }


};