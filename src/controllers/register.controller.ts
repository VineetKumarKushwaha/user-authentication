import UserCredential, { IUserCredential } from "../models/users.credentials";

interface ICreateUserInput {
    username: IUserCredential["username"];
    password: IUserCredential["password"];
}

async function CreateUser({
    username,
    password
}: ICreateUserInput): Promise<IUserCredential> {
    return UserCredential.create({
        username,
        password
    })
        .then((data: IUserCredential) => data)
        .catch((error: Error) => {
            throw error;
        });
}

export default CreateUser;
