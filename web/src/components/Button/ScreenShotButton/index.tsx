import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../../Loading";


interface ScreenShotButtonProps {
    onSreenShotTook:(screenshot:string | null) =>void;
    screeshot:string | null
}

export function ScreenShotButton({screeshot,onSreenShotTook}:ScreenShotButtonProps){

    const [isTakingScreenShot, setisTakingScreenShot] =useState(false)

    async function handleScreenShot(){
        setisTakingScreenShot(true);
        const canvas =   await html2canvas(document.querySelector('html')!)
        const base64image =  canvas.toDataURL('img/png')
        onSreenShotTook(base64image)
        setisTakingScreenShot(false);
    }


    if(screeshot){
        return (
        <button
            type="button"
            className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            style={{
                backgroundImage:`url(${screeshot})`,
                backgroundPosition:'right bottom',
                backgroundSize:180,
            }}
            onClick={()=>{onSreenShotTook(null)}}
        >
            <Trash weight="fill"  />
        </button>
        );
    }else{
    return(

        <button 
        type='button'
        onClick={handleScreenShot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:border-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 ">          
            {isTakingScreenShot ? <Loading /> : <Camera className="w-6 h-6"/>}
        </button>
    );
    }
}