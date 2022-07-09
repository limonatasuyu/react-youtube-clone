import {useParams} from 'react-router-dom'
import Header from '../Components/Header/Header'
import {NavbarSlide} from '../Components/Navbar/NavbarSlide'
import {motion, useAnimation} from 'framer-motion'
import {useState, useEffect} from 'react'
import {WatchPageTags} from '../Components/Tags'
import {CurrentlyWatchedVideo} from '../Components/Videos/CurrentlyWatchedVideo'
import axios from 'axios'
import {api_key} from '../apiKey'
import VideoThumbnailChunk from '../Components/Videos/VideoThumbnails'
import {RelatedVideos} from '../Components/Videos/Videos'
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
	
	

	var tags = ['all', 'related', 'test']
	
	
	
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
				<div>
					<WatchPageTags tags={tags}/>
					<div className='watchPage-relatedVideos'>
						<RelatedVideos videoId={videoId} />
					</div>
				</div>
			</div>
		</div>
	)
}
