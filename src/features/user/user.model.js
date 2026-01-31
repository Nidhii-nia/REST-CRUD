
export default class UserModel{
    constructor(id,name,email,password,type){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static signUp(name,email,password,type){
        const maxId = users.length>0 ? Math.max(...users.map(u => u.id)): 0;
        const newUser = new UserModel(maxId+1, name,email,password,type);
        users.push(newUser);
        return newUser;
    }

    static signIn(email,password){
        const findUser = users.find(user => user.email == email && user.password == password );
        return findUser;
    }

    static getAll(){
        return users;
    }

}

let users = [
    {
    id:1,
    name: "Seller User",
    email:"seller@ecom.com",
    password: "Pass1",
    type:"seller",
},
    {
    id:2,
    name: "Customer User 2",
    email:"customer@ecom.com",
    password: "Pass2",
    type:"customer",
},
    {
    id:3,
    name: "Customer User 3",
    email:"customer@ecom.com",
    password: "Pass3",
    type:"customer",
},
    {
    id:4,
    name: "Customer User 4",
    email:"customer@ecom.com",
    password: "Pass4",
    type:"customer",
}
];