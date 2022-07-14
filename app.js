const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = [];

function initApp() {
    startHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([{
        message: "Please enter team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Please select team member's role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Please enter team member's id",
        name: "id"
    },
    {
        message: "Please enter team member's email address",
        name: "email"
    }])
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "School name";
        } else {
            roleInfo = "Office number";
        }
        inquirer.prompt([{
            message: `Please enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: [
                "Yes",
                "No"
            ],
            name: "moreMembers"
        }])
        .then(function({roleInfo, moreMembers}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }
            employees.push(newMember);
            addHtml(newMember)
            .then(function() {
                if (moreMembers === "Yes") {
                    addMember();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}

addMember();
