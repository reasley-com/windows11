import Image from 'next/image'

import '@components/windows/NotificationController/NotificationController.css'

import notificationControllerInterface from '@/app/interfaces/notificationController'

interface NotificationControllerProps {
	props: {
        notifiactionController: notificationControllerInterface
		notificationControllerUpdate: (index:number) => void
		index: number
	}
}

export default function NotificationController({ props }: NotificationControllerProps ) {
	const notifiactionController       = props.notifiactionController
	const notificationControllerUpdate = props.notificationControllerUpdate
	const index                        = props.index
	
	return (<div className='notification_controller_cover'>
		<input id={String(index)} type='checkbox' checked={ notifiactionController.check } onChange={() => notificationControllerUpdate(index)}></input>
		<div className='notification_controller_md'>
			<label htmlFor={String(index)} key={index}>
				<Image alt='sun' src='/images/ui/sun.png' height='100' width='100' />
				<span>{ notifiactionController.text }</span>
			</label>
		</div>
	</div>)
}

