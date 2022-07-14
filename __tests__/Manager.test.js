const Manager = require('../lib/Manager');

test('creates a manager object',()=>{
    const manager = new Manager('Dave', 100,'dave@dave.com','123123123');

    expect(manager.name).toBe('Dave');
    expect(manager.id).toBe(100);
    expect(manager.email).toBe('dave@dave.com');
    expect(manager.officeNumber).toBe('123123123');
    expect(manager.getRole()).toEqual('Manager');
    expect(manager.getOfficeNumber()).toEqual('123123123');
});