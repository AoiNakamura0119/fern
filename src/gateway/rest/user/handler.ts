import { createUserUsecase, deleteUserUsecase, getUsersUsecase, updateUserUsecase } from "../../../domain/usecase/user/mod";
import { userRepositoryPrisma } from "../../rdb/user/repository";
import { createAccount } from "../../service/auth/mod";


const getUsers = getUsersUsecase(userRepositoryPrisma);
const createUser = createUserUsecase(userRepositoryPrisma);
const updateUser = updateUserUsecase(userRepositoryPrisma);
const deleteUser = deleteUserUsecase(userRepositoryPrisma);


export const userHandler = {
    gets: async (req: any, res: any) => {
        try {
            const users = await getUsers();
            res.status(200).json(users);
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    },
    post: async (req: any, res: any) => {
        console.log(req.body)
        try {
            const new_account = await createAccount(req.body.email, req.body.password)
            if (new_account) {
                console.log("new_account:", new_account)
                const user = await createUser(new_account.id, req.body.name, new_account.email);
                console.log("user:", user)
                res.status(201).json(user);
            } else {
                throw Error("error")
            }
        } catch (e: any) {
            console.error("errordfnapouvbap:", e)
            res.status(400).json({ error: e.message });
        }
    },
    update: async (req: any, res: any) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const user = await updateUser({ id, name, email });
            res.status(200).json(user);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    },
    delete: async (req: any, res: any) => {
        try {
            const { id } = req.params;
            await deleteUser(id);
            res.status(204).send(); // 成功だけど中身なし
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
      },
};
