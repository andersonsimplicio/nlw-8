import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedBackType, feedBackTypes } from "..";
import { api } from "../../../service/api";
import { CloseButton } from "../../Button/CloseButton";
import { ScreenShotButton } from "../../Button/ScreenShotButton";
import { Loading } from "../../Loading";


interface FeedBackContentTypeProps {
    feedbackType: FeedBackType
    onfeedbackRestartRequest: () => void
    onfeedbackSend: () => void
}

export function FeedBackContentStep({ feedbackType, onfeedbackRestartRequest, onfeedbackSend }: FeedBackContentTypeProps) {
    const feedbackTypeInfo = feedBackTypes[feedbackType];
    const [screenshot, setScreenShot] = useState<string | null>(null)
    const [comment, setCommet] = useState<string | null>('')
    const [isSedingFeedback, setIsSedingFeedback] = useState(false)

    async function handlerSumbitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSedingFeedback(true);
        // console.log(
        //     feedbackType,
        //     comment,
        //     screenshot
        // );
        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        });
        setIsSedingFeedback(false);
        onfeedbackSend();
    }

    return (
        <>
            <header>

                <button
                    type='button'
                    className="top-5 left-5 absolute"
                    onClick={onfeedbackRestartRequest}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4 text-zinc-400 hover:text-zinc-100" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img
                        src={feedbackTypeInfo.img.sources}
                        alt={feedbackTypeInfo.img.alt}
                        className='w-6 h-6' />

                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            <form onSubmit={handlerSumbitFeedback} className="my-4 w-full" >
                <textarea
                    className="min-w-[384px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que ocorreu.."
                    onChange={event => setCommet(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    < ScreenShotButton
                        screeshot={screenshot}
                        onSreenShotTook={setScreenShot}
                    />
                    <button
                        type="submit"
                        disabled={comment?.length == 0 || isSedingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSedingFeedback ? <Loading /> : 'Enviar feedback'}
                    </button>
                </footer>
            </form>
        </>
    );
}