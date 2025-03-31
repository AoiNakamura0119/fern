export type Feedback = {
    id: string;
    userId: string;
    title: string;
    content: string | null;
    cause: string | null;
    solution: string | null;
    createdAt: Date;
};

export const createFeedback = (input: {
    title: string;
    content?: string;
    cause?: string;
    solution?: string;
}, user_id: string): Feedback => {
    if (!input.title) throw new Error('タイトルは必須です');
    return {
        id: crypto.randomUUID(),
        userId: user_id,
        title: input.title,
        content: input.content || null,
        cause: input.cause || null,
        solution: input.solution|| null,
        createdAt: new Date(),
    };
};
  