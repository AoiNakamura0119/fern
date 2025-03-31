import { createFeedbackUsecase, deleteFeedbackUsecase, FeedbackRepository, getFeedbackUsecase } from "../../../domain/usecase/feedback.ts/mod";
import { FeedbackRepositoryPrisma } from "../../rdb/feedback/repository";
  
const getFeedbacks = getFeedbackUsecase(FeedbackRepositoryPrisma);
const createFeedback = createFeedbackUsecase(FeedbackRepositoryPrisma);
const updateFeedback = createFeedbackUsecase(FeedbackRepositoryPrisma);
const deleteFeedback = deleteFeedbackUsecase(FeedbackRepositoryPrisma);

export const feedbackHandler = {
    gets: async (req: any, res: any) => {
        try {
            console.log("アクセス!!!")
            const feedbacks = await getFeedbacks(req.user.sub);
            console.log("feedbacks:", feedbacks)
            res.status(200).json(feedbacks);
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    },

    post: async (req: any, res: any) => {
        try {
            const feedback = await createFeedback(req.body);
            res.status(201).json(feedback);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    },

    update: async (req: any, res: any) => {
        try {
            const { id } = req.params;
            const feedback = await updateFeedback({ id, ...req.body });
            res.status(200).json(feedback);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    },

    delete: async (req: any, res: any) => {
        try {
            const { id } = req.params;
            await deleteFeedback(id);
            res.status(204).send();
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    },
};
