export type User = {
    id: string;
    name: string;
    email: string;
};

export const createUser = (id: string, name: string, email: string): User => {
    if (name.length < 2) throw new Error('名前短すぎ');
    if (!email.includes('@')) throw new Error('メールアドレスが無効');
  
    return {
        id,
        name,
        email,
    };
};
