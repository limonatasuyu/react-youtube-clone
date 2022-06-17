import VideoThumbnailChunk from './VideoThumbnails'
import {useEffect, useState} from 'react'

function LoadThumbnail(props) {
	
	const [loadChunk, setLoadChunk] = useState(false)
	
	useEffect(() => {
		const abortController = new AbortController();
		
		const handler = () => {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {setLoadChunk(true); abortController.abort();}
		}
		window.addEventListener('scroll', handler, {signal: abortController.signal})
	}, [])
	
	const chunkCount = props.chunkCount + 1
	
	var condition;
	
	if (chunkCount === 10) {condition = false}
	else if (loadChunk === true) {condition = true}

	return(
		<>
		<VideoThumbnailChunk />
		{condition && <LoadThumbnail chunkCount={chunkCount} />}
		</>
	)
}

export function VideosHome(props) {
	
	const chunkCount = 0
	
	return(
		<div className={props.isMenuViewChanged ? "videos-home flex videos-home--small-menu" : "videos-home flex"}>
			<LoadThumbnail chunkCount={chunkCount} />
		</div>
	)
}
