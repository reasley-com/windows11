export default function formatTimeToAMPMFormat(date: Date) {
    const hours            = date.getHours()
    const minutes          = date.getMinutes()
    const ampm             = hours >= 12 ? '오후' : '오전'
    const formattedHours   = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = minutes.toString().padStart(2, '0')
  
    return `${ampm} ${formattedHours}:${formattedMinutes}`
}
  