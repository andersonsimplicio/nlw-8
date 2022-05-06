import { SubmitFeedBackUseCase } from "./feedbacks-use-cases-submit";

describe('Submit feedback', () => {
    it('shold be able to submit a feedback', async () => {
        const submitfeedback = new SubmitFeedBackUseCase(
            { create: async () => { } },
            { sendMail: async () => { } }
        )
        await expect(submitfeedback.execute(
            {
                type: 'BUG',
                comment: 'Example Comment',
                screenshot: 'data:image/png;base64,teste.jpg'
            }
        )).resolves.not.toThrow();
    });
});
