
import Wallpaper from '@components/wallpaper/Wallpaper'
import TaskBar from '@components/taskbar/TaskBar'

import { AlertContentsDragProvider } from '@components/windows/AlertContentsDrag/AlertContentsDragContext'
import { NotificationControllerProvider } from '@components/windows/NotificationController/NotificationControllerContext'


export default function Home() {
	return (
		<>
			<AlertContentsDragProvider>
			<NotificationControllerProvider>
				<Wallpaper />
				<TaskBar />
			</NotificationControllerProvider>
			</AlertContentsDragProvider>
		</>
	)
}
