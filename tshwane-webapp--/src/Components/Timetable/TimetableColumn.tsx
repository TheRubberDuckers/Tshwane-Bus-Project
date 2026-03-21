import TimetableRow from "./TimetableRow";

interface TimetableColumnProps {
    times: string[]
    label: string
    endpoints: string
    borderRight?: boolean
}

function getNowMin(): number{
    const n = new Date()
    return n.getHours() *60 + n.getMinutes()
}

function toMin(t: string): number{
    const [h, m] = t.split(':').map(Number)
    return h * 60 +m
}

export default function TimetableColumn({
    times,
    label,
    endpoints,
    borderRight
}: TimetableColumnProps){
    const nowMin = getNowMin()
    let nextMarked = false

    return (
        <div className={`
            flex flex-col overflow-hidden
            ${borderRight ? 'border-r border-tshwane-main/15': ''}
            `}>
            <div className="text-xs font-medium text-tshwane-mid">
                {label}
            </div>
            <div className="text-xs text-tshwane-mid/70 mt-0.5 truncate">
                {endpoints}
            </div>

            {/*Scrolling */}
            <div className="overflow-y-auto flex-1">
                {times.map((time, i) => {
                    const isPast = toMin(time)<nowMin
                    const isNext = !nextMarked && !isPast
                    if (isNext) nextMarked = true
                    return (
                        <TimetableRow
                            key={i}
                            index={i + 1}
                            time={time}
                            isPast={isPast}
                            isNext={isNext}
                            />
                    )
                })}
            </div>
        </div>
    )
}