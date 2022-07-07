import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {useOutsideClick} from '../../Helpers/CustomHooks'
import {getTimeChange, shortenNumber, parseISOString} from '../../Helpers/HelperFunctions'
import { v4 as uuidv4 } from 'uuid';
 
import {LoadCommentChunks} from './LoadComments'
import * as Icon from './ImportIcons'
import noImg from '../../img/OtherIcons/no-image.png'
import Avatar from '../../img/OtherIcons/avatar.jpeg'
const api_key = 'api_key'


const Comment = (props) => {
	
	// Setting up the read more button for comment, if it needs
	const comment = props.comment
	
	const [isShowinMore, setIsShowinMore] = useState(false)
	
	var content;
	if (comment.split('\n').length < 5) {content = comment}
	else if (!isShowinMore) {content = 
		<>
			{comment.split('\n').slice(0, 5).join('\n')}
			<p className='comment--show-more' onClick={() => {setIsShowinMore(true)}}>Read more</p>
		</>
	}
	else {content = 
		<>
			{comment}
			<p className='comment--show-more' onClick={() => {setIsShowinMore(false)}}>show less</p>
		</>
	}

	// Setting up the user like on comment
	// isUserLiked and isUserDisliked are needed preventing user to increase/decrase like count more than 1
	const [likeCount, setLikeCount] = useState(props.likeCount)
	const [isUserLiked, setIsUserLiked] = useState(false)
	const [isUserDisliked, SetIsUserDisliked] = useState(false)

	const handleLike = () => {
		if (!isUserLiked) {setLikeCount(likeCount + 1); setIsUserLiked(true)}
		else {setLikeCount(likeCount - 1); setIsUserLiked(false);}
	}	
	
	const handleDislike = () => {
		if (isUserLiked) {setLikeCount(likeCount - 1); setIsUserLiked(false)}
		if (!isUserDisliked) {SetIsUserDisliked(true)} else {SetIsUserDisliked(false)}
	}
	
	return (
		<div className='video-comments--single-comment flex'>
			<img className='single-comment--commenter-avatar' src={props.commenterAvatar} alt='commenter-avatar' onError={(e) => { e.target.onerror = null; e.target.src = noImg}}/>
			<div className='single-comment--comment-section'>
				<div className='comment-section--comment-details flex'>
					<div className='comment-details--commenter-name'>{props.commenterName}</div>
					<div className='comment-details--comment-date'>{props.date && getTimeChange(props.date)} ago {props.isChanged && '(edited)'}</div>
				</div>
				<div className='single-comment--comment' >
					{content}
				</div>	
				<div className='single-comment--icons flex'>
					{isUserLiked ? <Icon.LikeCommentActive onClick={handleLike}/> : <Icon.LikeComment onClick={handleLike}/>}
					{likeCount !== 0 && <p style={{marginLeft: '-.5rem'}}>{likeCount}</p>}
					{isUserDisliked ? <Icon.DislikeCommentActive onClick={handleDislike} /> : <Icon.DislikeComment onClick={handleDislike} />}
					<p>ANSWER</p>
				</div>
			</div>
		</div>
	)
}

function Comments(props) {
	
	const videoData = props.videoData
	
	const [commentListType, setCommentListType] = useState('relevance')

	// SortBy Drop Down Setup
	const [isSortByDropDownShowing, setIsSortByDropDownShowing] = useState(false)
	const sortByDropDownRef = useRef(null)
	useOutsideClick(sortByDropDownRef, () => setIsSortByDropDownShowing(false))

	// For comment input focus animation and comment, cancel button displays
	const [isCommentFocus, setIsCommentFocus] = useState(false)

	// Setting up the value of comment input
	const [newComment, setNewComment] = useState('')
	
	const [userComments, SetUserComments] = useState([])
	
	return(
	<div className='currently-watched--comments'>
				<div className='comments--icons flex' style={{gap: '1.8rem', alignItems: 'center'}}>
					<span className='comments--comment-count'>{videoData && videoData.statistics.commentCount} Comments</span>
					<div className='comments--icon flex' onClick={() => {
					setTimeout(() => {setIsSortByDropDownShowing(!isSortByDropDownShowing)}, 0)}}>
						<Icon.Sortby />
						{isSortByDropDownShowing && 
							<div ref={sortByDropDownRef} className='sort-by--drop-down drop-down'>
								<div style={commentListType === 'relevance' ? {backgroundColor: 'rgba(0, 0, 0, .2)'} : {} } 
									onClick={() => { if (commentListType !== 'relevance') { setCommentListType('relevance')}}}>
									<p >Best Reviews</p>
								</div>
								<div style={commentListType === 'time' ? {backgroundColor: 'rgba(0, 0, 0, .2)'} : {} }
										onClick={() => {if (commentListType !== 'time') { setCommentListType('time')}}}>
									<p>New First</p>
								</div>
							</div>
						}
						<span>SORT BY</span>
					</div>
				</div>
				<div className='comments--user-comment flex'>
					<img src={Avatar} alt='user-avatar' />
					<div>
						<input 
						placeholder='Add a comment...'
						value={newComment}
						onChange={(e) => {setNewComment(e.target.value)}}
						onFocus={() => {setIsCommentFocus(true)}}
						/>
						<hr className={isCommentFocus ? '' : 'display-none'}/>
						<div className={isCommentFocus ? 'user-comment--buttons flex' : 'display-none'}>
							<button onClickCapture={() => {setNewComment(''); setIsCommentFocus(false)}}>CANCEL</button>
							<button
							onClick={() => {SetUserComments([...userComments, <Comment
								commenterAvatar={Avatar}
								commenterName="User"
								date={(new Date()).toISOString()}
								isChanged={false}
								comment={newComment}
							/>]); setNewComment(''); }} 
							style={(newComment.length !== 0) ? {backgroundColor: '#065fd4', color: 'white'} : {}}
							>COMMENT</button>
						</div>
					</div>	
				</div>
				<div className='comments--video-comments grid'>
					{userComments}
					{commentListType === 'relevance' && <LoadCommentChunks videoId={props.videoId} commentListType='relevance'/>}
					{commentListType === 'time' && <LoadCommentChunks videoId={props.videoId} commentListType='time'/>}
				</div>
			</div>
	)
}

export {Comments, Comment}
