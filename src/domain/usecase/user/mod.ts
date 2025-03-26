import { createUser, User } from '../../model/user';

// get.tsというファイル名の変更

// ✅ ユースケースが自分の中でインターフェースを定義
export interface UserRepository {
    gets(): Promise<User[]>;
    post(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}

// ✅ usecase は interface にしか依存しない
export const getUsersUsecase = (repo: UserRepository) => async () => {
    return await repo.gets();
};

export const createUserUsecase = (repo: UserRepository) => async (input: {
    name: string;
    email: string;
}) => {
    const user = createUser(input.name, input.email);
    await repo.post(user);
    return user;
};

export const updateUserUsecase = (repo: UserRepository) => async (input: {
    id: string;
    name: string;
    email: string;
}) => {
    const user: User = {
        id: input.id,
        name: input.name,
        email: input.email,
    };
  
    await repo.update(user);
  
    return user;
};

export const deleteUserUsecase = (repo: UserRepository) => async (id: string) => {
    await repo.delete(id);
};
