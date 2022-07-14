const Employee = require('../lib/Employee');

test('creates an Employee object',()=>{
    const employee = new Employee('Dave', 100,'dave@dave.com');

    expect(employee.name).toBe('Dave');
    expect(employee.id).toBe(100);
    expect(employee.email).toBe('dave@dave.com');
});