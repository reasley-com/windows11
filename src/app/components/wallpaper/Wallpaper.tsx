import Image from 'next/image'
import ur from '/public/images/back.jpg'

import styles from './Wallpaper.module.css'

export default function Wallpaper() {
	return (
		<div className='wallpaper'>
			<Image className={styles.image} src={ur} alt='windows11 default background image' priority />
		</div>
	)
}