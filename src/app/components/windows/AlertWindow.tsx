'use client'

import { useState } from 'react'

import { nanoid } from 'nanoid'

import '@components/windows/AlertWindow.css'

import AlertContentsDrag from '@components/windows/AlertContentsDrag/AlertContentsDrag'

import NotificationController from '@components/windows/NotificationController/NotificationController'
import notificationControllerInterface from '@interfaces/notificationController'

import notificationContextInterface from '@interfaces/notificationContext'

import { useAlertContentsDragData } from '@components/windows/AlertContentsDrag/AlertContentsDragContext'
import { useNotificationControllerData } from '@components/windows/NotificationController/NotificationControllerContext'


interface AlertWindowProps {
	props: {
        showWindow: boolean
	}
}

export default function AlertWindow({ props }: AlertWindowProps) {
	// 알림창 패널 보여주기 여부
	const { showWindow } = props
	
	// 알림창 알람 데이터 및 컨트롤러
	const { notificationContextsList, AlertContentsDragDelete } = useAlertContentsDragData()

	// 알림창 설정 컨트롤 패널 데이터 및 컨트롤러
	const { notifiactionControllerList, notificationControllerUpdate } = useNotificationControllerData()

	// 알림창 컨트롤 패널 축소 여부
	const [ controllerReduction, setControllerReduction ] = useState<boolean>(true)
	
	return(<div className={[ 'notification', showWindow ? 'notification__active' : 'notification__inactive' ].join(' ')} onClick={(e) => e.stopPropagation()}>
		<div className='notification_setting'>
			<span>Manage notifications</span>
		</div>

		<div className='notification_context' style={{ height: `calc(100% - 36px - ${controllerReduction ? 104 : 220}px)` }}>
			{ notificationContextsList?.length === 0 
				? <span className='flex_object'>No new notifications</span>
				: notificationContextsList?.map((notificationContext: notificationContextInterface, index: number) => {
					return (<AlertContentsDrag props={{ notificationContext, AlertContentsDragDelete, index }} key={ nanoid() }></AlertContentsDrag>)
				})
			}
		</div>

		<div className='notification_panel' style={{
				height: `${controllerReduction ? 104 : 220}px`
			}}>
			<div className='notification_panel_item'>
				<div className='controller_reduction_cover'>
					<input id='controllerReduction' type='checkbox' checked={controllerReduction} onChange={() => setControllerReduction(!controllerReduction)}></input>
					<label htmlFor='controllerReduction'>{ controllerReduction ? '확장' : '축소' }</label>
				</div>
			</div>
			<div className='notification_panel_item'>
				<span onClick={() => { notificationContextsList.map((item, index) => {
					AlertContentsDragDelete(index)
				}) } }>모든 알림 지우기</span>
			</div>
			
			{ notifiactionControllerList?.map((notifiactionController: notificationControllerInterface, index: number) => {
				return (<NotificationController props={{ notifiactionController, notificationControllerUpdate, index }} key={ nanoid() }></NotificationController>)
			}) }
		</div>
	</div> )
}