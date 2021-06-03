const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "index.html");

const render = require("./lib/htmlRenderer");
const { connect } = require("tls");

const teamMember = [];
function app() {
    function getManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your managers name"
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your Id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your Email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is your managers office number please?"
            }
        ]).then(response => {
            const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.officeNumber);
            teamMember.push(manager);
            addingNewMember();
        })

    }
    function getEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineers name"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your Id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your Email?"
            },
            {
                type: "input",
                name: "github",
                message: "What is your Github username please?"
            }
        ]).then(response => {
            const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.github);
            teamMember.push(engineer);
            addingNewMember();
        })

    }
    function getIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your interns name"
            },
            {
                type: "input",
                name: "internId",
                message: "What is your Id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your Email?"
            },
            {
                type: "input",
                name: "school",
                message: "What is your school please?"
            }
        ]).then(response => {
            const intern = new Intern(response.internName, response.internId, response.internEmail, response.school);
            teamMember.push(intern);
            addingNewMember();
        })

    }
    function addingNewMember() {
        inquirer.prompt([
            {
                type:"list",
                name: "selectemployees",
                message: "What is your employee type?",
                choices: [
                    "manager",
                    "engineer",
                     "intern",
                    "done"
                ],
                filter: function (val) {
                    return val.toLowerCase();
                  },
            }
        ]).then(response => {
            const role = response.selectemployees;
            console.log(role);

            if (role === "manager") {
                getManager();
            }
           else if (role === "engineer") {
                getEngineer();
            }
           else if (role === "intern") {
                getIntern();
            }
           else if (role === "done") {
                renderTeam();
            }
        });

    }
    addingNewMember()
}
function renderTeam () {
    fs.writeFileSync(outputPath, render(teamMember), "utf-8");

}
app();