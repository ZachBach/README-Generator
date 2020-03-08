const fs = require('fs');
const axios = require("axios");
const inquirer = require('inquirer');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile)

function repoQuestions() {
return inquirer.prompt ([
    {
        type: "input",
        name: "username",
        message: "What is your Github Username?"
    },
    {
        type: "input",
        name: "title",
        message: "Please write a title for your project"
    },
    {
        type: "input",
        name: "description",
        message: "Please write a short description of your project"
    },
    {
        type: "input",
        name: "license",
        message: "What kind of license should your project have?"
    },
    {
        type: "input",
        name: "installation",
        message: "What command should be run to install dependecies?"
    },
    {
        type: "input",
        name: "tests",
        message: "What command should be run to run tests?"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?"
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repo?"
    },
    
])
};

var getName = (data) => {
    var queryUrl = `https://api.github.com/users/${data.username}`;
    return axios.get(queryUrl)
}


const generateMarkdown = (data, image, email) => {
    console.log(data)
    return `
# ${data.title}
![Github license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description
  ${data.description}

 ## Table of Contents
  *[Installation](#installation)

  *[Usage](#usage)

  *[License](#license)

  *[Contributing](#contributing)

  *[Tests](#tests)

  *[Questions](#questions)
  
## Installation

To install necessary dependencies, run the following command:

    ${data.installation}

## Usage

${data.usage}

## License

This project is licensed under the ${data.usage} license.

## Contributing

${data.contributing}

## Tests

To run tests, run the following command:

    ${data.tests}

## Questions

<img src="${image}" alt="avatar" style="border-radius: 16px" width="30"/>

If you have any questions about the repo, open an issue or contact@

[${data.username}]${email}

  `
};



  async function init() {
  console.log("Generating README")
  try {
     
    const data = await repoQuestions();

    const res =  await getName(data);

    const md =  generateMarkdown(data,res.data.avatar_url,res.data.html_url);

    await writeFileAsync("README.md", md);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();


