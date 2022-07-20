import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {Comment} from './Comments'
import {api_key} from '../../apiKey'
import {useOnScreen} from '../../Helpers/CustomHooks'


function LoadCommentChunks(props) {
	
	const [mountCoundition, setMountCoundition] = useState(false)
	
	// I need to know if user is on end of the page or not in order to load other comments, but i can't use the window or document height for this because comments section is in a
	// div with absolute positioning so i put a empty div on end of the comments and use useOnScreen hook
	const commentObserver = useRef(null)
	const isCommentsObserverVisible = useOnScreen(commentObserver)
	
	// Creating state for Next page token in order to use it on next chunk of comments
	const [pageToken, setPageToken] = useState(null)
	
	// Creating state for detecting if this is the last comment chunk or not
	const [isNextChunkExists, setIsNextChunkExists] = useState(false)
	
	// Creating a state and eventListener to detecting if user is scrolling or not
	const [windowScrollY, setwindowScrollY] = useState(window.scrollY)
	useEffect(() => {window.addEventListener('scroll', () => {setwindowScrollY(window.scrollY)})}, [])
		
	const [commentList, setCommentList] = useState([])
	
	// Creating a useEffect hook with windowScrollY dependency to fetch comments
	// If user is scrolling and the needed counditions are true then axios will fetch the data and add it end of the commentList
	useEffect(() => {
		if (isNextChunkExists) {return}
		if (!isCommentsObserverVisible && mountCoundition === true) {setMountCoundition(false)}
		if (isCommentsObserverVisible && mountCoundition === false) {setMountCoundition(true)}
		if (!mountCoundition) {return}
		var url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=${props.commentListType}&videoId=${props.videoId}&key=${api_key}`;
		// Detecting if this is the first chunk or not
		if (pageToken) {
		url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&pageToken=${pageToken}&order=${props.commentListType}&videoId=${props.videoId}&key=${api_key}`}
		// Calling axios to fetch a 'Chunk' of comments
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
				// Setting the chunk that will be mounted
				setCommentList([...commentList, comList])
				// Detecting if chunk after this one exists, if not return and not execute the line after that and prevent unnecessary re-rendering
				if (res.data.nextPageToken === undefined) {setIsNextChunkExists(true); return}
				// Setting next page token in order to use it on next chunk of comments
				setPageToken(res.data.nextPageToken)
		})
			.catch((err) => {console.log(err)})
				.then(() => {console.log('comment request made')})
	}, [windowScrollY])
	
	return(
	<>
	{commentList}
	<div ref={commentObserver} style={{width: '2rem', height: '2rem'}} />
	</>
	)
}

export {LoadCommentChunks}
