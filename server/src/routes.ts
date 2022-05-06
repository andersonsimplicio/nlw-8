import { PrimasFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import express from "express";
import { SubmitFeedBackUseCase } from "./use-cases/feedbacks-use-cases-submit";
import { NodeMailerMailAdpter } from './adapters/nodemailer/nodemailer-node-adapter';

export const routes = express.Router()


routes.post('/feedbacks', async (req, res) => {
    // console.log(req.body);

    const { type, comment, screenshot } = req.body;
    const primaFeedBacksRepository = new PrimasFeedbacksRepository();
    const nodemailAdapter = new NodeMailerMailAdpter();

    const submitFeedbackUseCase = new SubmitFeedBackUseCase(primaFeedBacksRepository, nodemailAdapter);
    await submitFeedbackUseCase.execute({ type, comment, screenshot });

    return res.status(201).send();
})