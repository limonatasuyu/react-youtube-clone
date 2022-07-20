import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {Comment} from './Comments'
import {api_key} from '../../apiKey'
import {useOnScreen} from '../../Helpers/CustomHooks'

function CommentChunk(props) {

	const [commentList, setCommentList] = useState([])

	useEffect(() => {
		var url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=20&order=${props.commentListType}&videoId=${props.videoId}&key=${api_key}`;
		if (props.pageToken) {
		url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=20&pageToken=${props.pageToken}&order=${props.commentListType}&videoId=${props.videoId}&key=${api_key}`}
		if (url === props.fetchUrl) {return}
		console.log(props.fetchUrl)
		props.setFetchUrl(url)
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
	const [isItLastChunk, setIsItLastChunk] = useState(false)
	const [pageToken, setPageToken] = useState(null)
	var mountCoundition = false
	if (!isItLastChunk && isChunkNeedsMount === true) {mountCoundition = true}
	
	// I need to know if user is on end of the page or not in order to load othr comments, but i can't use the window or document height for this because comments section is in a
	// div with absolute positioning so i put a empty div on end of the comments and use useOnScreen hook
	const commentObserver = useRef(null)
	const isCommentsObserverVisible = useOnScreen(commentObserver)
	
	if (isCommentsObserverVisible && isChunkNeedsMount === false) {setIsChunkNeedsMount(true)}
	
	const [fetchUrl, setFetchUrl] = useState(null)
	
	return(
	<>
	<CommentChunk
		videoId={props.videoId} 
		commentListType={props.commentListType}
		pageToken={props.pageToken}
		setPageToken={setPageToken}
		setIsItLastChunk={setIsItLastChunk}
		setFetchUrl={setFetchUrl}
		fetchUrl={fetchUrl}
		/>
	{mountCoundition && <LoadCommentChunks
		videoId={props.videoId}
		commentListType={props.commentListType}
		pageToken={pageToken}
		/>}
	<div ref={commentObserver} style={{width: '2rem', height: '2rem'}} />
	</>
	)
}

export {LoadCommentChunks}
