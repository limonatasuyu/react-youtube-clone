//import videoImg from '../img/example-thumbnail.webp'
//import Avatar from '../img/OtherIcons/avatar.jpeg'
import {ReactComponent as Options} from '../../img/DropDownIcons/VideoOptions/options.svg'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {shortenNumber, getTimeChange, getDurationObj, getRandomObjects, getRandomElements} from '../../Helpers/HelperFunctions'
import noImg from '../../img/OtherIcons/no-image.png'
import axios from 'axios'
import jsonData from '../../data.json'
import {videoMetaData} from './ImportData'

const api_key = 'api_key'

function VideoThumbnail(props) {

	const data = props.data
	var publishDate = data.snippet.publishedAt.slice(0, data.snippet.publishedAt.length - 4)
	const duration = getDurationObj(data.contentDetails.duration)

	return(
		<Link to={data ? `/watch?q=${data.id}` : "/"} className="video-thumbnail" style={{textDecoration: "none", color: "Black"}}>
				<div className="video-img-wrapper">
					<img src={data.snippet.thumbnails.high.url} alt="thumbnail"/>
					<div className="video-duration">{duration.Hours !== "0" ? duration.Hours + ":" : ""}{duration.Minutes}:{duration.Seconds}</div>
				</div>
				<div className="video-details flex">
					<div className="channel-img--thumbnail">
						<img src={props.channelData.snippet.thumbnails.high.url} onError={(e) => { e.target.onerror = null; e.target.src = noImg}} alt="channel-pp"/>
					</div>
					<div className="video-details-text">
						<p className="video-name">{data.snippet.title}</p>
						<p className="channel-name">{data.snippet.channelTitle}</p>
						<p className="video-details-meta">{data && shortenNumber(data.statistics.viewCount)} views • {getTimeChange(publishDate)} ago </p>
					</div>
					<div className="video-options">
						<Options />
					</div>
				</div>
		</Link>
	)
}


// A chunk for 20 thumbnails
export default function VideoThumbnailChunk(props) {
	
	const videoCountPerChunk = 20
	const categoryCountPerChunk = 5
	
	const [videoData, setData] = useState([])
	const [channelData, setChannelData] = useState([])
	const [isChannelDataFetched, setIsChannelDataFetched] = useState(false)
	
	var randomCategories = props.randomCategories
	
	//fetching data of random videos with youtube data api v3
	useEffect(() => {
		
		let arr = [];
		
		function getVideoData(videoCount) {

			let idArray = []
			if (videoCount === videoCountPerChunk) {
				for (let i=0; i < categoryCountPerChunk; i++) {
					let randomIds = getRandomElements(videoCount/categoryCountPerChunk ,videoMetaData[randomCategories[i]])
					idArray.push(...randomIds)
				}
			} else {
				for (let i=1; i <= videoCount; i++) {
					let randomId = getRandomElements(1 ,videoMetaData[randomCategories[randomCategories.length % i]])
					idArray.push(...randomId)
				}
			}
			let arrClosure;	
			axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet, statistics, contentDetails&id=${idArray}&key=${api_key}`)
				.then((res) => {
				if (idArray.length - res.data.items.length !== 0) { getVideoData(idArray.length - res.data.items.length) }
				arrClosure = arr.concat(res.data.items)
				arr = arrClosure
				setData(arrClosure)
			})
				.catch((err) => {console.log(err)})
					.then(() => {console.log("request made")})
		}

		getVideoData(videoCountPerChunk)
	}, [])
	
	
	//fetching channel data about the fetched videos to use channel profile picure
	useEffect(() => {
		//checking if the video fetch is complete
		if (videoData.length !== videoCountPerChunk) {return}

		var channelIdArray = videoData.map((item) => {return item.snippet.channelId})
		axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIdArray}&key=${api_key}`)
			.then((res) => { setChannelData(res.data.items); setIsChannelDataFetched(true) })
			.catch((err) => console.log(err))
				.then(() => console.log('channel request made'))

	}, [videoData])

	
	var videothumbnails = []
	
	//Checking the fetch is complete or not
	if (videoData.length === videoCountPerChunk && isChannelDataFetched) {
		
		// reordering the data in order the match videos and channel profile picture
		var channelDataProp = [];
		var videoDataProp = [];
		for (let i of channelData) { for (let a of videoData	) {
				if (i.snippet.title === a.snippet.channelTitle) { channelDataProp.push(i); videoDataProp.push(a)}
		}}

		//mapping all of the data to VideoThumbnail Component
		videothumbnails = videoDataProp.map((item, index) => { return <VideoThumbnail key={index} data={item} channelData={channelDataProp[index]} categoryId={item.snippet.categoryId}/> })
	}


	return(
		<>
			{videothumbnails}
		</>
	)
}
