import Header from '../Components/Header'
import {Navbar} from '../Components/Navbar'
import {NavbarSlide} from '../Components/NavbarSlide'
import {useState, useEffect} from 'react'
import {motion, useAnimation} from 'framer-motion'
import {TagsHome} from '../Components/Tags'
import {VideosHome} from '../Components/Videos'
import axios from 'axios'
import jsonData from '../data.json'

const api_key = 'api_key'

export default function HomePage() {

	const [isMenuViewChanged, setMenuView] = useState(false) 
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	useEffect(() => {
		window.addEventListener('resize', () => {setWindowWidth(window.innerWidth)})
	}, [])
	
	const control = useAnimation()
	
	var vars = {
		visible: {x: -73, transition: {duration: .25}},
		unVisible: {x: -311	, transition: {duration: .25}},
	}
	
	const handleMenu = () => {
		setMenuView(!isMenuViewChanged)
		if (windowWidth > 1330) {return}
		if (isMenuViewChanged) {control.start("unVisible")}
		else {control.start("visible")}

	}
	if (windowWidth > 1330) {control.start("unVisible")}


	const [videoData, setData] = useState([])
	const [channelData, setChannelData] = useState([])
	
	useEffect(() => {
		
		let arr = []
		function getVideoData(videoCount) {
			let arrClosure;	
			let idArray = []
			for (let i=0; i < videoCount; i++) {idArray.push(jsonData[Math.floor(Math.random() * (jsonData.length + 1))])}
			axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet, statistics, contentDetails&id=${idArray}&key=${api_key}`)
				.then((res) => {
				if (idArray.length - res.data.items.length !== 0) {getVideoData(idArray.length - res.data.items.length)}
				arrClosure = arr.concat(res.data.items)
				arr = arrClosure
				setData(arrClosure)
			})
				.catch((err) => {console.log(err)})
					.then(() => {console.log("request made")})
		}
		
		getVideoData(16)

	}, [])
	
	useEffect(() => {
		if (videoData.length !== 16) {return}
		
		var channelIdArray = videoData.map((item) => {return item.snippet.channelId})
		axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIdArray}&key=${api_key}`)
			.then((res) => { setChannelData(res.data.items) })
			.catch((err) => console.log(err))
				.then(() => console.log('channel request made'))
		
	}, [videoData])


	return(
		<div className="homepage-container" >
			<Header handleMenu={handleMenu}/>
			<div className="flex">
				<Navbar
					isMenuViewChanged={isMenuViewChanged}
					handleMenu={handleMenu}
				/>
				<motion.div
					style={{zIndex: "3"}}
					initial={'unVisible'}
					animate={control}
					variants={vars}
					drag="x"
					dragMomentum={false}
					dragConstraints={{right: -73}}
					dragElastic={0}
					onDragEnd={(e, i)=> {if (i.point.x > 80) {control.start("visible")} else {control.start("unVisible"); setMenuView(!isMenuViewChanged)}}}
					>
				<NavbarSlide handleMenu={handleMenu} />
				</motion.div>
				<div className={isMenuViewChanged ? "home-page-content home-page-content-big" : "home-page-content"}>
					<TagsHome />
					<VideosHome isMenuViewChanged={isMenuViewChanged} videoData={videoData} channelData={channelData}/>
				</div>
			</div>
		</div>
	)
}
