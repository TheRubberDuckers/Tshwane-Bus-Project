interface TimetableRowProps{
    index: number
    time: string
    isPast: boolean
    isNext: boolean
}

export default function TimetableRow({ index, time, isPast, isNext}:TimetableRowProps){
    return(
        <div className={`
            flex items-center gap-2 px-4 py-2
            border-b border-tshwane-main/19 last:border-0
            hover:bg-tshwane-faint transition-colors
            ${isPast ? `opacity-40` : ''}
            `}>

        <span className="text-xs text-tshwane-mid font-mono w-5">
            {index}
        </span>

        {/*Time*/}
        
        <span className={`text-sm font-medium font-mono flex-1
            ${isPast ? 'text-tshwane-mid' : `text-tshwane-dark}`}
            `}>
            "   "{time}
        </span>
        {isNext && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full 
            bg-tshwane-faint text-tshwane-dark border border-tshwane-main/25">
                Next
            </span>
        )}
        </div>
    )
}


