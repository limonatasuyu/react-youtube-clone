import VideoThumbnailChunk from './VideoThumbnails'
import {useEffect, useState} from 'react'
import {videoMetaData} from './ImportData'
import {getRandomObjects, getRandomElements} from '../../Helpers/HelperFunctions'

// Thumbnails in HomePage needs to be loaded by chunks in order to maintain the 'load onScrollEnd' functionality
// It basically means saying the computer 'when user gets end of the screen load new thumbnails'   
function LoadThumbnail(props) {
	
	// Setting the state for the chunk after this one needs mounting or not
	const [isChunkNeedsMount, setIsChunkNeedsMount] = useState(false)

	// isChunkNeedsMount needs to change once so i'm using useEffect hook
	useEffect(() => {
		
		const abortController = new AbortController();
		
		// Function for detecting if user is end of the page or not 
		// It also deletes the event listener when it's done to prevent unusing eventlistener to use memory (or something i don't really know how eventlisteners uses memory but it sounds good to deleting an unusing thing)
		const handler = () => {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {setIsChunkNeedsMount(true); abortController.abort();}
		}
		window.addEventListener('scroll', handler, {signal: abortController.signal})
	}, [])

	// Detecting which chunk i'm dealing with right now
	const chunkCount = props.chunkCount + 1
 
	var mountCondition;
	// Limiting the maximum chunk count to mount
	if (chunkCount === 10) {mountCondition = false}
	// Detecting isChunkNeedsMount (Duh!) 
	else if (isChunkNeedsMount === true) {mountCondition = true}
	
	// Creating two variants of category sets to create two kinds of chunks with different categories
	var randomCategories;
	if (chunkCount % 2 === 1) {
		randomCategories = props.randomCategories.slice(0, 5)
	} else {
		randomCategories = props.randomCategories.slice(5)
	}
	
	return(
		<>
		<VideoThumbnailChunk randomCategories={randomCategories} />
		{mountCondition && <LoadThumbnail chunkCount={chunkCount} randomCategories={props.randomCategories}/>}
		</>
	)
}

// Actual component for HomePage Thumbnails
export function VideosHome(props) {
	
	// Creating chunkCount variable (see: line 26)
	const chunkCount = 0
	
	// Creating a state for randomCategories in order to arranging the thumbnails and tags orientation 
	const [randomCategories, setCategories] = useState(null);
	
	// randomCategories needs to be setted once so i'm using useEffect hook
	useEffect(() => {
		// getRandomObjects is a function for getting random n objects from an object (for more: ../../Helpers/HelperFunctions.js)
		setCategories(getRandomObjects(10, videoMetaData))
	}, [])
	
	// if the randomCategories is not setted yet return Nothing
	if (randomCategories === null) {return}
	
		return(
			<div className={props.isMenuViewChanged ? "videos-home flex videos-home--small-menu" : "videos-home flex"}>
				<LoadThumbnail chunkCount={chunkCount} randomCategories={randomCategories}/>
			</div>
		)
}
