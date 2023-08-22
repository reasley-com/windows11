import { useState } from 'react'

import LazyImage from 'next/image'

import '@components/windows/AlertContentsDrag/AlertContentsDrag.css'

import notificationContextInterface from '@interfaces/notificationContext'

interface AlertContentsDragProps {
	props: {
	  notificationContext: notificationContextInterface
	  AlertContentsDragDelete: (index: number) => void
	  index: number
	}
}

interface dragData {
	isDrag: boolean,
	dragStartX: number,
	dragOffsetX: number
}

interface dragCss {
	isOpacity: boolean,
	isTransition: boolean
}

export default function AlertContentsDrag({ props }: AlertContentsDragProps) {
	const notificationContext = props.notificationContext
	const AlertContentsDragDelete = props.AlertContentsDragDelete
	const index = props.index
	
	// 알람 드래그 위치
	const [dragData, setDragData] = useState<dragData>({
		isDrag: false,
		dragStartX: 0,
		dragOffsetX: 0
	})
	
	// 알람 드래그 위치에 따른 효과 변경
	const [dragCss, setDragCss] = useState<dragCss>({
		isOpacity: false,
		isTransition: false
	})
	
	const handleDragStart = (event: React.DragEvent<HTMLInputElement>) => {
		// 이미지 더미 데이터 생성
		const img = new Image()

		// 이미지 피드백 효과 제거
		event.dataTransfer.setDragImage(img, 0, 0)

		setDragData({ ...dragData, isDrag: true, dragStartX: event.clientX })
	}
	
	const handleDrag = (event: React.DragEvent<HTMLInputElement>) => {
		if (dragData.isDrag) {
			const offsetX = event.clientX - dragData.dragStartX
			
			if (Math.sign(offsetX) !== 1 ) {    // 우측 드래그만 허용
				setDragData({ ...dragData, dragOffsetX: 0 })
				return
			}
			
			if ( offsetX >= 110 ) {
				setDragCss({ ...dragCss, isOpacity: true })
			} else {
				setDragCss({ ...dragCss, isOpacity: false })
			}
			setDragData({ ...dragData, dragOffsetX: offsetX })
		}
	}
	
	const handleDragEnd = (event: React.DragEvent<HTMLInputElement>) => {
		const offsetX = event.clientX - dragData.dragStartX

		if( offsetX >= 110 ) {
			setDragCss({ ...dragCss, isOpacity: true, isTransition: true })
			setDragData({ ...dragData, isDrag: false, dragOffsetX: 500 })
			
			AlertContentsDragDelete(index)
		} else {
			setDragCss({ ...dragCss, isOpacity: false })
			setDragData({ ...dragData, isDrag: false, dragStartX: 0, dragOffsetX: 0 })
		}
	}
	
	return(<div className='notification_context_cover'
			   style={{ 
				   left: dragData.dragOffsetX + 'px',
				   maxHeight: dragData.dragOffsetX == 500 ? '0px' : '97px', 
				   transitionProperty: 'left, max-height, margin',
				   transitionDuration: dragCss.isTransition ? '0.35s, 0.20s, 0.20s' : '0s, 0.20s, 0.20s',
				   opacity: dragCss.isOpacity ? '0.6' : '1',
			   }}
			   draggable='true' 
			   onDragStart={handleDragStart}
			   onDrag={handleDrag}
			   onDragEnd={handleDragEnd}
			>
			<div className='notification_context_md'>
				<div className='notification_context__top'>
					<div className='icon_sm'>
						<LazyImage alt='audio' src={`/images/ui/${notificationContext.icon}.png`} height='100' width='100' />
					</div>
					<span>{notificationContext.type}</span>
				</div>

				<div className='notification_context__btm'>
					<div className='icon_sm'>
						<LazyImage alt='audio' src={`/images/ui/${notificationContext.icon}.png`} height='100' width='100' /> 
					</div>

					<div className='notification_context_item flex_column'>
						<span>{notificationContext.title}</span>
						<span>{notificationContext.text}</span>
						<span>{notificationContext.time}</span>
					</div>
				</div>
			</div>
	   </div>)
}