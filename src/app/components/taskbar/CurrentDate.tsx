import { useState, useEffect } from 'react';

import formatDateToHphenFormat from '@functions/formatDateToHphenFormat'
import formatTimeToAMPMFormat from '@functions/formatTimeToAMPMFormat'

type dateType = 'date' | 'time'
interface CurrentDateProps { type: dateType }

function CurrentDate(props: CurrentDateProps) {
    // 반환할 날짜 데이터 형태
    const { type } = props

    // 현재 날짜
    const [currentTime, setCurrentTime] = useState(new Date())

    // 1초 단위로 업데이트
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => { clearInterval(intervalId) }
    }, [])

    if( type === 'date' ) { return formatDateToHphenFormat(currentTime) }
    if( type === 'time' ) { return formatTimeToAMPMFormat(currentTime) }
}

export default CurrentDate
