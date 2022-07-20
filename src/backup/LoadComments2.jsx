import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {Comment} from './Comments'
import {api_key} from '../../apiKey'
import {useOnScreen} from '../../Helpers/CustomHooks'

function LoadCommentChunks(props) {
	
	// Creating state for Next page token in order to use it on next chunk of comments
	const [nextPageToken, setNextPageToken] = useState(null)
	
	// Creating state for detecting if this is the last comment chunk or not
	const [isItLastChunk, setIsItLastChunk] = useState(false)
	
	// Creating commentList state to mount it on fetch	
	const [commentList, setCommentList] = useState([])
		
	useEffect(() => {
		var url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=${props.commentListType}&videoId=${props.videoId}&key=${api_key}`;
		// Detecting if this is the first chunk or not
		if (props.pageToken) {
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
				// Setting next page token in order to use it on next chunk of comments
				setNextPageToken(res.data.nextPageToken)
				// Detecting if chunk after this one exists
				if (res.data.nextPageToken === undefined) {setIsItLastChunk(true)}
				// Setting the chunk that will be mounted
				setCommentList(comList)
		})
			.catch((err) => {console.log(err)})
				.then(() => {console.log('comment request made')})
	}, [])
	
	// Creating a state for detecting if chunk after this needs mount or exist
	const [isChunkNeedsMount, setIsChunkNeedsMount] = useState(false)

	// I need to know if user is on end of the page or not in order to load othr comments, but i can't use the window or document height for this because comments section is in a
	// div with absolute positioning so i put a empty div on end of the comments and use useOnScreen hook
	const commentObserver = useRef(null)
	const isCommentsObserverVisible = useOnScreen(commentObserver)
	
	// detecting if chunk after this needs mount, 'isChunkNeedsMount === false' is for preventing too many re-renders
	if (isCommentsObserverVisible && isChunkNeedsMount === false) {setIsChunkNeedsMount(true)}
	
	const [mountCoundition, setMountCoundition] = useState(false)
	if (!isItLastChunk && isChunkNeedsMount === true && mountCoundition === false) {setMountCoundition(true)}

	return(
	<>
	{commentList}
	{mountCoundition && <LoadCommentChunks
		videoId={props.videoId}
		commentListType={props.commentListType}
		pageToken={nextPageToken}
		/>}
	<div ref={commentObserver} style={{width: '2rem', height: '2rem'}} />
	</>
	)
}

export {LoadCommentChunks}
