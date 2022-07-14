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
        .then(function ({ name, role, id, email }) {
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
                .then(function ({ roleInfo, moreMembers }) {
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
                        .then(function () {
                            if (moreMembers === "Yes") {
                                addMember();
                            } else {
                                finishHtml();
                            }
                        });

                });
        });
}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./dis/index.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `
                <div class="col-4 mt-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h3>${member.name}</h3>
                            <h4>Engineer</h4>
                        </div>
                        <div class="card-body">
                        <p class="id">ID: ${member.id}</p>
                        <p class="email">Email: <a href="mailto:${member.email}">${member.email}</a></p>
                        <p class="github">Github: <a href="https://github.com/${member.github}">${member.github}</a></p>
                        </div>
                    </div>
                </div>
            `;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `
                <div class="col-4 mt-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h3>${member.name}</h3>
                            <h4>Intern</h4>
                        </div>
                         <div class="card-body">
                        <p class="id">ID: ${member.id}</p>
                        <p class="email">Email:<a href="mailto:${member.email}">${member.email}</a></p>
                        <p class="school">School: ${member.school}</p>
                         </div>
                    </div>
                </div>
        `;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `
                <div class="col-4 mt-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h3>${member.name}</h3>
                            <h4>Manager</h4><i class="material-icons">content_paste</i>
                        </div>
                        <div class="card-body">
                            <p class="id">ID: ${member.id}</p>
                            <p class="email">Email: <a href="mailto:${member.email}">${member.email}</a></p>
                            <p class="office">Office Number: ${member.officeNumber}</p>
                    </div>
                </div>
        </div>`
        }
        console.log("adding team member");
        fs.appendFile("./dis/index.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
};

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dis/index.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
};

initApp();