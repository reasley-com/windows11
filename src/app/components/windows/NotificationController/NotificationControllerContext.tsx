'use client'

import { createContext, useContext, useState } from 'react'

import notificationControllerInterface from '@interfaces/notificationController'

// Context 생성
const NotificationControllerContext = createContext<NotificationControllerContextType | undefined>(undefined)

interface NotificationControllerContextType {
	notifiactionControllerList: notificationControllerInterface[];
	notificationControllerUpdate: (index: number) => void;
}

// Context Provider 컴포넌트
export function NotificationControllerProvider({ children }: { children: React.ReactNode }) {
	const [notifiactionControllerList, setNotificationControllerList] = useState([
		{ text: '모든 설정', icon: 'setting', check: false },
		{ text: '모든 설정', icon: 'setting', check: false },
		{ text: '모든 설정', icon: 'setting', check: false },
		{ text: '모든 설정', icon: 'setting', check: false },
		{ text: '모든 설정', icon: 'setting', check: false },
		{ text: '모든 설정', icon: 'setting', check: false },
		{ text: '모든 설정', icon: 'setting', check: false },
		{ text: '모든 설정', icon: 'setting', check: false },
		{ text: '모든 설정', icon: 'setting', check: false },
	])
	
	const notificationControllerUpdate = (index: number) => {
		// 인자 index 값으로 check 전환
		setNotificationControllerList(prevNotificationControllerList => 
			prevNotificationControllerList.map((notificationController, notificationControllerIndex) => 
				index === notificationControllerIndex ? {...notificationController, check: !notificationController.check } : notificationController)
		)
	}
	
	return (
		<NotificationControllerContext.Provider value={{ notifiactionControllerList, notificationControllerUpdate }}>
			{children}
		</NotificationControllerContext.Provider>
	)
}

// 커스텀 훅을 통해 데이터 사용
export function useNotificationControllerData() {
	const context = useContext(NotificationControllerContext)
	if (!context) {
		throw new Error('useData must be used within a DataProvider')
	}
	return context
}