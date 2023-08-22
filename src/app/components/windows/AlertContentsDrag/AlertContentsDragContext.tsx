'use client'

import { createContext, useContext, useState } from 'react'

import notificationContextInterface from '@interfaces/notificationContext'

// Context 생성
const AlertContentsDragContext = createContext<AlertContentsDragContextType | undefined>(undefined)

interface AlertContentsDragContextType {
	notificationContextsList: notificationContextInterface[];
	AlertContentsDragDelete: (index: number) => void;
}

// Context Provider 컴포넌트
export function AlertContentsDragProvider({ children }: { children: React.ReactNode }) {
	const [notificationContextsList, setnotificationContextsList] = useState([
		{ type: '윈도우 기능', title: '스크린샷', text: '스크린샷이 저장되었습니다.', time: '오후 7:58', icon: 'sun' },
		{ type: '보안 및 유지 관리', title: 'Windows 방화벽 사용', text: 'Windows 방화벽을 사용하도록 설정하세요', time: '오후 7:58', icon: 'sun' },
		{ type: '보안 및 유지 관리', title: 'Windows 방화벽 사용', text: 'Windows 방화벽을 사용하도록 설정하세요', time: '오후 7:58', icon: 'sun' },
		{ type: '보안 및 유지 관리', title: 'Windows 방화벽 사용', text: 'Windows 방화벽을 사용하도록 설정하세요', time: '오후 7:58', icon: 'sun' },
		{ type: '보안 및 유지 관리', title: 'Windows 방화벽 사용', text: 'Windows 방화벽을 사용하도록 설정하세요', time: '오후 7:58', icon: 'sun' },
		{ type: '보안 및 유지 관리', title: 'Windows 방화벽 사용', text: 'Windows 방화벽을 사용하도록 설정하세요', time: '오후 7:58', icon: 'sun' },
		{ type: '보안 및 유지 관리', title: 'Windows 방화벽 사용', text: 'Windows 방화벽을 사용하도록 설정하세요', time: '오후 7:58', icon: 'sun' },
		{ type: '보안 및 유지 관리', title: 'Windows 방화벽 사용', text: 'Windows 방화벽을 사용하도록 설정하세요', time: '오후 7:58', icon: 'sun' },
	])
	
	let deleteTimer: NodeJS.Timeout | null = null
	let removeCheck: boolean               = false
	let removeIndexes: number[]            = []

	const AlertContentsDragDelete = (index: number) => {
		// 삭제 진행 중 판단
		if( removeCheck && deleteTimer ) { clearTimeout(deleteTimer) }
		
		// 삭제 항목 추가
		removeIndexes.push(index)

		// 애니메이션 동작 이후에 삭제
		const newTimer = setTimeout(() => {
			setnotificationContextsList((prevNotificationContext) => {
				const newContext = prevNotificationContext.filter((_, i) => !removeIndexes.includes(i))
				return newContext
			})
			removeCheck   = false
			removeIndexes = []
		}, 200)

		deleteTimer = newTimer // 새로운 타이머 설정
		removeCheck = true
	}
	
	return (
		<AlertContentsDragContext.Provider value={{ notificationContextsList, AlertContentsDragDelete }}>
			{children}
		</AlertContentsDragContext.Provider>
	)
}

// 커스텀 훅을 통해 데이터 사용
export function useAlertContentsDragData() {
	const context = useContext(AlertContentsDragContext)
	if (!context) {
		throw new Error('useData must be used within a DataProvider')
	}
	return context
}