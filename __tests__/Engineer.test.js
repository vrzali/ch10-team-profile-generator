const Engineer = require('../lib/Engineer');

test('creates an Engineer object',()=>{
    const engineer = new Engineer('Dave', 100,'dave@dave.com','dave');

    expect(engineer.name).toBe('Dave');
    expect(engineer.id).toBe(100);
    expect(engineer.email).toBe('dave@dave.com');
    expect(engineer.github).toBe('dave')
    expect(engineer.getRole()).toEqual('Engineer');
    expect(engineer.getGithub()).toEqual('dave');
});