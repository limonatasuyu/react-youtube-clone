import {useParams} from 'react-router-dom'
import Header from '../Components/Header/Header'
import {NavbarSlide} from '../Components/Navbar/Navbar'
import {motion, useAnimation} from 'framer-motion'
import {useState, useEffect} from 'react'
import {CurrentlyWatchedVideo, DescriptionArea} from '../Components/WatchingVideo/CurrentlyWatchedVideo'
//import VideoThumbnailChunk from '../Components/Thumbnails/VideoThumbnails'
import {RelatedVideos} from '../Components/Thumbnails/Videos'
import {CommentsSection} from '../Components/Comments/Comments'
import axios from 'axios'
import {api_key} from '../apiKey'

export default function WatchVideoPage() {
	
	const {videoId} = useParams()
	
	// Navbar Animation setup
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
	
	const [videoData, setVideoData] = useState(null)
	const [channelData, setChannelData] = useState(null)
	
	// Defining functions for fetching and setting the data
	function getVideoData() {
		
		axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet, statistics, contentDetails&id=${videoId}&key=${api_key}`)
			.then((res) => {setVideoData(res.data.items[0])})
			.catch((err) => {console.log(err)})
				.then((res) => {console.log('request for single video made')})
	}

	function getChannelData() {
		if (videoData)
		axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics, snippet&id=${videoData.snippet.channelId}&key=${api_key}`)
			.then((res) => {setChannelData(res.data.items[0])})
			.catch((err) => {console.log(err)})
				.then(() => {console.log('channel request for single video made')})
	}

	const [windowWidth, setWindowWidth] = useState(null)
	// Fetching and setting the data
	// I'm detecting the window width with windowWidth but using window.innerWidth because if i use windowWidth, it gives null on first mount
	// And if i dont detect the windowWidth component is not rendering
	useEffect(() => {getVideoData(); window.addEventListener('resize', () => {setWindowWidth(window.innerWidth)})}, [])

	// For fetching the data about channel there is a need for fetching and setting the data about video 
	useEffect(() => {if (videoData) {getChannelData()}}, [videoData])
	
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
				<CurrentlyWatchedVideo videoData={videoData && videoData} channelData={channelData && channelData} videoId={videoId}/>
				<div className='watchPage-relatedVideos'>
					<RelatedVideos videoId={videoId} />
				</div>
			</div>
			<div>
				<div className='commentsection-n-descriptionarea--wrapper'>
					{window.innerWidth > 1015 && <DescriptionArea channelData={channelData} videoData={videoData}/>}
					<CommentsSection commentCount={videoData && videoData.statistics.commentCount} videoId={videoId}/>
				</div>
			</div>
		</div>
	)
}
