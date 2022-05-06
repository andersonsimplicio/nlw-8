import { MailAdapter } from './../adapters/email-adapters';
import { FeedbacksRepository } from './../repositories/feedbacks-repositories';

interface SubmitFeedBackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string
}


export class SubmitFeedBackUseCase {

    constructor(
        private feedbacksrepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async execute(request: SubmitFeedBackUseCaseRequest) {
        const { type, comment, screenshot } = request;
        await this.feedbacksrepository.create({
            type, comment, screenshot
        })

        if (!type) {
            throw new Error('Type is requied');
        }
        if (!comment) {
            throw new Error('Comment is requied');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error("Invlaid Screeshot format");
        }

        await this.mailAdapter.sendMail({
            subject: 'Novo FeedBack',
            body: ['<div style="font-family sans-serif; font-size:16px; color:#111; ">',
                `<p>Tipo do feedback ${type}<p>`,
                `<p>Comentário do feedback ${comment}<p>`,
                screenshot ? `<img src="${screenshot}" />` : ``,
                '<div>',
            ].join('\n')
        })
    }
}