import {useParams} from 'react-router-dom'
import Header from '../Components/Header/Header'
import {NavbarSlide} from '../Components/Navbar/NavbarSlide'
import {motion, useAnimation} from 'framer-motion'
import {useState, useEffect} from 'react'
import {Tag} from '../Components/Tags'
import {CurrentlyWatchedVideo} from '../Components/Videos/Videos'

export default function WatchVideoPage() {
	
	const {videoId} = useParams()
	
	const [isMenuViewChanged, setMenuView] = useState(false)
	const control = useAnimation()

	var vars = {
		visible: {x: -3, transition: {duration: .25}},
		unVisible: {x: -311	, transition: {duration: .25}},
	}

	const handleMenu = () => {
		setMenuView(!isMenuViewChanged)
		if (isMenuViewChanged) {control.start("unVisible")}
		else {control.start("visible")}
	}
	
	
	return(
		<div className='watchPage-container'>
			<Header handleMenu={handleMenu}/>
			<motion.div
				style={{zIndex: "3"}}
				initial={'unVisible'}
				animate={control}
				variants={vars}
				drag="x"
				dragMomentum={false}
				dragConstraints={{right: -3}}
				dragElastic={0}
				onDragEnd={(e, i)=> {if (i.point.x > 80) {control.start("visible")} else {control.start("unVisible"); setMenuView(!isMenuViewChanged)}}}
				>
				<NavbarSlide handleMenu={handleMenu} style={{display: 'block'}} />
			</motion.div>
			<div className='watchPage-content--container flex' style={{gap: '1rem'}}>	
				<CurrentlyWatchedVideo videoId={videoId} />
				<div className='comments'>
				</div>
				<div>
					<div className='watchPage-tags flex' style={{gap: '.5rem'}}>
						<Tag tagName='test 1'/>
						<Tag tagName='test 2'/>
					</div>
					<div className='watchPage-relatedVideos'>
					</div>
				</div>
			</div>
		</div>
	)
}
