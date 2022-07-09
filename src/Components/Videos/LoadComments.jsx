import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {Comment} from './Comments'
import {api_key} from '../../apiKey'

// Comments from the video
function DefaultCommentChunk(props) {

	const [commentList, setCommentList] = useState([])

	useEffect(() => {

		var url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=${props.commentListType}&videoId=${props.videoId}&key=${api_key}`;
		if (props.pageToken) {
		console.log(props.pageToken)
		url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&pageToken=${props.pageToken}&order=${props.commentListType}&videoId=${props.videoId}&key=${api_key}`}
		
		axios.get(url)
			.then((res) => {
				var comList = res.data.items.map((item, index) => {
					return <Comment
						key={uuidv4()}
						comment={item.snippet.topLevelComment.snippet.textOriginal}
						date={item.snippet.topLevelComment.snippet.publishedAt}
						isChanged={item.snippet.topLevelComment.snippet.publishedAt !== item.snippet.topLevelComment.snippet.updatedAt}
						commenterName={item.snippet.topLevelComment.snippet.authorDisplayName}
						commenterAvatar={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
						likeCount={item.snippet.topLevelComment.snippet.likeCount}
						/>
				})
				props.setPageToken(res.data.nextPageToken)
				if (res.data.nextPageToken === undefined) {props.setIsItLastChunk(true)}
				setCommentList(comList)
		})
			.catch((err) => {console.log(err)})
				.then(() => {console.log('comment request made')})
	
	}, [])

	return <>{commentList}</>
}

function LoadCommentChunks(props) {

	const [isChunkNeedsMount, setIsChunkNeedsMount] = useState(false)
	const [pageToken, setPageToken] = useState(null)
	
	useEffect(() => {
	
	const abortController = new AbortController();

	// Function for detecting if user is on end of the page or not 
	const handler = () => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {setIsChunkNeedsMount(true); abortController.abort();}
	}
	window.addEventListener('scroll', handler, {signal: abortController.signal})
	}, [])

	
	const [isItLastChunk, setIsItLastChunk] = useState(false)
	
	var mountCoundition = false
	if (!isItLastChunk && isChunkNeedsMount) {mountCoundition = true}
	
	return(
	<>
	<DefaultCommentChunk
		videoId={props.videoId} 
		commentListType={props.commentListType}
		pageToken={props.pageToken}
		setPageToken={setPageToken}
		setIsItLastChunk={setIsItLastChunk}
		/>
	{mountCoundition && <LoadCommentChunks
		videoId={props.videoId}
		commentListType={props.commentListType}
		pageToken={pageToken}
		setPageToken={props.setPageToken}
		/>}
		
	</>
	)

}

export {LoadCommentChunks}

