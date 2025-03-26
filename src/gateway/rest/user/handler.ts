import { createUserUsecase, deleteUserUsecase, getUsersUsecase, updateUserUsecase } from "../../../domain/usecase/user/mod";
import { userRepositoryPrisma } from "../../rdb/user/repository";


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
            const user = await createUser(req.body);
            res.status(201).json(user);
        } catch (e: any) {
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
