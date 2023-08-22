'use client'

import { useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import AlertWindow from '@components/windows/AlertWindow'
import '@components/taskbar/TaskBar.css'

interface ShowWindow {
	setting: boolean
	calendar: boolean
	alert: boolean
	[key: string]: boolean  // 인덱스 시그니쳐
}

// SSR 비활성화 컴포넌트
const DynamicCurrentTime = dynamic(() => import('@components/taskbar/CurrentDate'), { ssr: false })

export default function TaskBar() {
	const [showWindow, setShowWindow] = useState<ShowWindow>({ setting: false, calendar: false, alert: false })
	const showWindowHandler = (event: React.MouseEvent<HTMLInputElement>) => {
		const classification = event.currentTarget.getAttribute('data-classification')
		if (typeof classification === 'string') {
			setShowWindow({ ...showWindow, [classification]: !showWindow[classification] })
		}
	}

	const taskbarIconList = [
		{ icon: 'start' },
		{ icon: 'directory' },
		{ icon: 'edge' },
		{ icon: 'microsoft_store' },
		{ icon: 'vscode' }
	]
	
	const settingIconList = [
		{ icon: 'wifi' },
		{ icon: 'audio' }
	]

	return (
		<>
			<div className='taskbar'>
				<div></div>

				<div className='icon'>
					{ taskbarIconList.map((taskbarIcon, index) => {
						return (<div className='icon_md' key={`${taskbarIcon.icon}-${index}`}>
							<Image alt='window' src={`/images/icons/${taskbarIcon.icon}.png`} height='100' width='100' />
						</div>)
					}) }
				</div>

				<div className='icon'>
					{ settingIconList.map((settingIcon, index) => {
						return (<div className='icon_sm' key={`${settingIcon.icon}-${index}`} onClick={settingIcon.icon === 'audio' ? showWindowHandler : undefined} data-classification={settingIcon.icon === 'audio' ? 'setting' : ''}>
								<Image alt='audio' src={`/images/ui/${settingIcon.icon}.png`} height='100' width='100' />
							</div>)
					}) }
					<div className='clockbar'>
						<p><DynamicCurrentTime type='time' /></p>
						<p><DynamicCurrentTime type='date' /></p>
					</div>
					<div className='alertbar' onClick={showWindowHandler} data-classification='alert'>
						<Image alt='alert' src='/images/ui/alert.png' height='100' width='100' />
					</div>
				</div>
			</div>
		
			<AlertWindow props={{ showWindow: showWindow.alert }}></AlertWindow>
		</>
	)
}