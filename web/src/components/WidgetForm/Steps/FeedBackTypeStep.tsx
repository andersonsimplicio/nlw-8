import { useState } from 'react';
import BugImageUrl from '../../../assets/bug.svg';
import IdeaImageUrl from '../../../assets/idea.svg';
import thoughtImageUrl from '../../../assets/bug.svg';
import { FeedBackType, feedBackTypes } from '..';
import { CloseButton } from '../../Button/CloseButton';


interface FeedBackTypeStepProps {
    onFeedBackChange:(type:FeedBackType) => void;
}


export function FeedBackTypeStep({onFeedBackChange}:FeedBackTypeStepProps){
   
    return (
        <>
        <header>
        <span className="text-xl leading-6 ">Deixe seu Feedback</span>
        <CloseButton />
         </header>
        <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedBackTypes).map(([key,value])=>{
                return (
                    <button
                        key={key}
                        className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                        onClick={()=>onFeedBackChange(key as FeedBackType)}
                        type="button"
                    >
                    <img src={value.img.sources} alt={value.img.alt} />
                    <span>{value.title}</span>
                    </button>
                )
            })}
         </div>
        </>
    );
}