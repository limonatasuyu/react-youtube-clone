import VideoThumbnailChunk, {RelatedVideoThumbnail} from './VideoThumbnails'
import {useEffect, useState} from 'react'
import {api_key} from '../../apiKey'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

// Thumbnails in HomePage needs to be loaded by chunks in order to maintain the 'load onScrollEnd' functionality
// It basically means saying the computer 'when user gets end of the screen load new thumbnails'   
function LoadThumbnail(props) {
	
	// Setting the state for the chunk after this one needs mounting or not
	const [isChunkNeedsMount, setIsChunkNeedsMount] = useState(false)

	useEffect(() => {
		
		const abortController = new AbortController();
		
		// Function for detecting if user is on end of the page or not 
		// When it's done, it also deletes the event listener to prevent unusing eventlisteners to use memory (or something i don't really know how eventlisteners uses memory but it sounds good to deleting an unusing thing)
		const handler = () => {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {setIsChunkNeedsMount(true); abortController.abort();}
		}
		window.addEventListener('scroll', handler, {signal: abortController.signal})
	}, [])

	useEffect(() => {
	
		if (props.displayedVideoCount < 16 && props.currentCategory !== 'All') {
			setIsChunkNeedsMount(true)
		}
	
	}, [props.displayedVideoCount])

	// Detecting which chunk i'm dealing with right now
	const chunkCount = props.chunkCount + 1
 
	var mountCondition;
	// Limiting the maximum chunk count to mount
	if (chunkCount >= 11) {mountCondition = false}
	// Detecting isChunkNeedsMount (Duh!) 
	else if (isChunkNeedsMount === true) {mountCondition = true}
	
	// Creating two variants of category sets to create two kinds of chunks with different categories
	var categories;
	if (chunkCount % 2 === 1) {
		categories = props.categories.slice(0, 5)
	} else {
		categories = props.categories.slice(5)
	}
	
	return(
		<>
		<VideoThumbnailChunk categories={categories} currentCategory={props.currentCategory} setDisplayedVideoCount={props.setDisplayedVideoCount}/>
		{mountCondition && <LoadThumbnail chunkCount={chunkCount} categories={props.categories} currentCategory={props.currentCategory} setDisplayedVideoCount={props.setDisplayedVideoCount} displayedVideoCount={props.displayedVideoCount}/>}
		</>
	)
}

// Actual component for HomePage Thumbnails
export function VideosHome(props) {
	
	// Creating chunkCount variable (see: line 26)
	const chunkCount = 0
	
	const categories = props.categories
	
	const [displayedVideoCount, setDisplayedVideoCount] = useState(0)
	console.log(displayedVideoCount)
	return(
		<div className={props.isMenuViewChanged ? "videos-home flex videos-home--small-menu" : "videos-home flex"}>
			<LoadThumbnail chunkCount={chunkCount} categories={categories} currentCategory={props.currentCategory} setDisplayedVideoCount={setDisplayedVideoCount} displayedVideoCount={displayedVideoCount}/>
		</div>
	)
}

export function RelatedVideos(props) {
	
	var videoId = props.videoId 
	const [relatedVideos, setRelatedVideos] = useState(null)
	const [nextPageToken, setNextPageToken] = useState(null)

	useEffect(() => {
		var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&relatedToVideoId=${videoId}&type=video&videoEmbeddable=true&key=${api_key}`;
		var StatisticsFetchUrl = (idArray) => {return `https://www.googleapis.com/youtube/v3/videos?part=snippet, statistics, contentDetails&id=${idArray}&key=${api_key}`}
		axios.get(url)
			.then((res) => {
				setNextPageToken(res.data.nextPageToken)
				// sometimes there can be a video without snippet
				var thumbnailIdList = []
				for (let i = 0; i < res.data.items.length; i++) {if (res.data.items[i].snippet) { thumbnailIdList = [res.data.items[i].id.videoId, ...thumbnailIdList]}}
				axios.get(StatisticsFetchUrl(thumbnailIdList))
					.then((res) => {
					setRelatedVideos(res.data.items.map((item) => {return <RelatedVideoThumbnail key={uuidv4()} data={item}/>}))
					})
					.catch((err) => {console.log(err)})
						.then(() => {console.log('related videos properties request made')})
				})
			.catch((err) => {console.log(err)})
				.then(() => {console.log('related videos request made')})
	}, [])
	
	return(
		<div className='related-videos--container grid'>
			{relatedVideos}
		</div>
	)
}
