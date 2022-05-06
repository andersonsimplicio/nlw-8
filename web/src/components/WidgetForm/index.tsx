import { useState } from "react";

import BugImageUrl from '../../assets/bug.svg';
import IdeaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/bug.svg';
import { FeedBackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedBackContentStep";
import { FeedBackSucessStep } from "./Steps/FeedBackSucessStep";

export const feedBackTypes = {
    BUG:{
        title:'Problema',
        img:{
            sources:BugImageUrl,
            alt:'Imagem de um inseto'
        }
    },
    IDEA:{
        title:'Sugestão',
        img:{
            sources:IdeaImageUrl,
            alt:'Imagem de uma Lâmpada'
        }
    },
    OTHER:{
        title:'Outro',
        img:{
            sources:thoughtImageUrl,
            alt:'Imagem de um balão de pensamento'
        }
    }
}
export type FeedBackType = keyof typeof feedBackTypes


export function WidgetForm(){
    const [feedbackTypes,setFeedBackType] = useState<FeedBackType | null>(null)
    const [feedbacksend, setfeedbacksend] = useState(false)

    function handlerFeedBackRestart(){
        setFeedBackType(null);
        setfeedbacksend(false);
    }

    return(
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbacksend ? 
             (<FeedBackSucessStep  
                onfeedbackRestartRequest={handlerFeedBackRestart} />
             ):
             (
                 <>
                    {!feedbackTypes ? (
                        <FeedBackTypeStep onFeedBackChange={setFeedBackType} />
                        ): (
                        <FeedBackContentStep 
                        feedbackType={feedbackTypes}
                        onfeedbackRestartRequest={handlerFeedBackRestart}
                        onfeedbackSend={() =>setfeedbacksend(true)}
                        />
                        )}
                 </>
             )
        
        }
        <footer className="text-xs text-neutral-400 " >
            Feito por <a className="underline underline-offset-1" href="https://andersonsimplicio.github.io/works/">Anderson</a>
        </footer>
    </div>
    )
}