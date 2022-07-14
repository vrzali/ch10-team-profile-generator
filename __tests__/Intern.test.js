const Intern = require("../lib/Intern");

test('creates an Intern object',()=>{
    const intern = new Intern ('Dave', 100,'dave@dave.com','UoT');

    expect(intern.name).toBe('Dave');
    expect(intern.id).toBe(100);
    expect(intern.email).toBe('dave@dave.com');
    expect(intern.school).toBe('UoT')
    expect(intern.getRole()).toEqual('Intern');
    expect(intern.getSchool()).toEqual('UoT');
});