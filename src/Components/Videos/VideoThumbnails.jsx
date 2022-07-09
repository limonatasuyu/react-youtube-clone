import {ReactComponent as Options} from '../../img/DropDownIcons/VideoOptions/options.svg'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {shortenNumber, getTimeChange, getDurationObj, getRandomElements} from '../../Helpers/HelperFunctions'
import noImg from '../../img/OtherIcons/no-image.png'
import axios from 'axios'
import {videoMetaData} from './ImportData'
import {api_key} from '../../apiKey'


export function VideoThumbnail(props) {

	const data = props.data
	var publishDate = data.snippet.publishedAt.slice(0, data.snippet.publishedAt.length - 4)
	const duration = getDurationObj(data.contentDetails.duration)
	
	
	var currentCategoryId = props.currentCategoryId
	var categoryId = Number(props.categoryId)

	var isDisplay;
	if (currentCategoryId === 0 || currentCategoryId === categoryId) {isDisplay = true;}
	else {isDisplay = false;}

	var {setDisplayedVideoCount} = props
	useEffect(() => {
		if (isDisplay) {setDisplayedVideoCount(prev => {return prev + 1})}
		else {setDisplayedVideoCount(prev => {return prev - 1})}
	}, [isDisplay])

	return(
		<Link to={data ? `/watch/${data.id}` : "/"} className={isDisplay ? "video-thumbnail" : "display-none" } style={{textDecoration: "none", color: "Black"}}>
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

	// Creating a state to store video data
	const [videoData, setData] = useState([])

	var categories = props.categories

	// fetching data of random videos with youtube data api v3
	useEffect(() => {

		// Creating the array that will be using on setData
		let arr = [];

		// I'm creating a function to get video data instead of writing code directly (or i think declaratively is right way to say, idk) because not all of the video Ids from the database i'm using right now is working,
		// so i'll be needed to use the same code again 
		// The function takes an argument as videoCount in order to detect how many video's data needs to be fetched 'succesfully'
		function getVideoData(videoCount) {

			// Creating an array to store random videoIds from the database
			let idArray = []

			// Creating a for loop to push random video id's in idArray
			// Using videoCount for iteration
			for (let i=1; i <= videoCount; i++) {
				// i % categories.length gives 0, 1, 2, 3, 4 in order with the iteration count, so there is equal (or almost equal) number of videos with different categories 
				let category = categories[i % categories.length]
				// getRandomElements is a function for getting random n elements from an array (for more: ../../Helpers/HelperFunctions.js)
				let randomId = getRandomElements(1 ,videoMetaData[category])
				// getRandomElements returns an array so i'm spreading the array and pushing element to idArray
				idArray.push(...randomId)
			}
			// Making request to api to get data about videos, using idArray to specify videos i wanna get data about
			axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet, statistics, contentDetails&id=${idArray}&key=${api_key}`)
				.then((res) => {
				// If some of the videoIds are broken or corrupted naturally the api can't give nothing about it so i'm calling the getVideoData function again in order to match total fetched data amount and videoCountPerChunk
				if (idArray.length - res.data.items.length !== 0) { getVideoData(idArray.length - res.data.items.length) }
				// Concating the arr with the data that is fetched on current run, if it's not the first execution it'll be concatted with the last concatted data too
				arr = arr.concat(res.data.items)
				// Preventing to 	setting data multiple times
				if (arr.length === videoCountPerChunk) {setData(arr)}
			})
				.catch((err) => {console.log(err)})
					.then(() => {console.log("request made")})
		}

		getVideoData(videoCountPerChunk)
	}, [])

	
	// There is a need for channel about the fetched videos to use channel profile picure
	const [channelData, setChannelData] = useState([])
	// Creating a state to detect if channelData is fetched or not instead of detecting it with comparing videoCountPerChunk and channelData length,
	// because sometimes there is a problem happening while fetching channel data and not all of the channel data is being fetched,
	// but it does not make really sense to re fetch the channel data with already broken channel id and i can use a fallback image for channel profile picture 
	const [isChannelDataFetched, setIsChannelDataFetched] = useState(false)
	
	//fetching channel data, using videoData in dependency array to fetch the data when videoData sets
	useEffect(() => {
		//checking if the video fetch is complete, because useEffect is working on the first mount of component too
		if (videoData.length !== videoCountPerChunk) {return}

		// mapping all of the video's channelId to an array
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

		const categoriesObject = {
			'All': 0,
			'FilmAndAnimation' : 1, 
			'AutosAndVehicles' : 2, 
			'Music' : 10,
			'PetsAndAnimals' : 15,
			'Sports' : 17,
			'TravelAndEvents' : 19,
			'Gaming' : 20,
			'PeopleAndBlogs' : 22,
			'Comedy' : 23,
			'Entertainment' : 24,
			'NewsAndPolitics' : 25,
			'HowtoAndStyle' : 26,
			'Education' : 27,
			'ScienceAndTechnology' : 28,
			'Shows' : 43,
		}
		
		var currentCategory = props.currentCategory
		var currentCategoryId = categoriesObject[currentCategory]
		
		//mapping all of the data to VideoThumbnail Component
		videothumbnails = videoDataProp.map((item, index) => { 
			return <VideoThumbnail key={index} 
														data={item} 
														channelData={channelDataProp[index]} 
														categoryId={item.snippet.categoryId} 
														currentCategoryId={currentCategoryId}
														setDisplayedVideoCount={props.setDisplayedVideoCount}
														/>
		
		})
	}


	return(
		<>
			{videothumbnails}
		</>
	)
}
