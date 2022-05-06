import { FeedbacksCreateData, FeedbacksRepository } from './../feedbacks-repositories';
import { prisma } from "../../prisma";

export class PrimasFeedbacksRepository implements FeedbacksRepository {
    async create({ type, comment, screenshot }: FeedbacksCreateData) {
        await prisma.feedback.create({
            data: {
                type: type,
                comment: comment,
                screenshot: screenshot
            }
        })
    }
}