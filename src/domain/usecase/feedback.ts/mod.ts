import { Feedback, createFeedback } from '../../model/feedback';

export interface FeedbackRepository {
    gets(user_id: string): Promise<Feedback[]>;
    post(feedback: Feedback): Promise<void>;
    update(user: Feedback): Promise<void>;
    delete(id: string): Promise<void>;
}

export const getFeedbackUsecase = (repo: FeedbackRepository) => async (user_id: string) => {
    return await repo.gets(user_id);
};

export const createFeedbackUsecase = (repo: FeedbackRepository) => async (input: {
    title: string;
    content?: string;
    cause?: string;
    solution?: string;
}, user_id: string) => {
    const feedback = createFeedback(input, user_id);
    await repo.post(feedback);
    return feedback;
};

export const updateFeedbackUsecase = (repo: FeedbackRepository) => async (input: {
    id: string;
    userId: string;
    title: string;
    content?: string;
    cause?: string;
    solution?: string;
}) => {
    const feedback: Feedback = {
        id: input.id,
        userId: input.userId,
        title: input.title,
        content: input.content || null,
        cause: input.cause || null,
        solution: input.solution || null,
        createdAt: new Date()
    };
  
    await repo.update(feedback);
  
    return feedback;
};

export const deleteFeedbackUsecase = (repo: FeedbackRepository) => async (id: string) => {
    await repo.delete(id);
};
