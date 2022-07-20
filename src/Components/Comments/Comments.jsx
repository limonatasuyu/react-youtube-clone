import {useState} from 'react'
import {getTimeChange} from '../../Helpers/HelperFunctions'

import {LoadCommentChunks} from './LoadComments'
import {ReactComponent as LikeComment} from '../../img/OtherIcons/likeComment.svg'
import {ReactComponent as DislikeComment} from '../../img/OtherIcons/dislikeComment.svg'
import {ReactComponent as LikeCommentActive} from '../../img/OtherIcons/likeCommentActive.svg'
import {ReactComponent as DislikeCommentActive} from '../../img/OtherIcons/dislikeCommentActive.svg'

import noImg from '../../img/OtherIcons/no-image.png'
import Avatar from '../../img/OtherIcons/avatar.jpeg'

import {CommentsSortByDropDown} from '../DropDowns/DropDowns'

function Comment(props) {
	
	const [isShowinMore, setIsShowinMore] = useState(false)
	
	// Setting up the read more button for comment, if it needs	
	var content;
	if (props.comment.split('\n').length <= 5) {content = props.comment}
	else if (!isShowinMore) {content = 
		<>
			{props.comment.split('\n').slice(0, 5).join('\n')}
			<p className='comment--show-more' onClick={() => {setIsShowinMore(true)}}>Read more</p>
		</>
	}
	else {content = 
		<>
			{props.comment}
			<p className='comment--show-more' onClick={() => {setIsShowinMore(false)}}>show less</p>
		</>
	}

	// Setting up the user like on comment
	// if userLikeCase is true then it means user liked the comment, if it is false then user disliked, if it is null it means user is not like either disliked the comment
	const [userLikeCase, setUserLikeCase] = useState(null)
	const [likeCount, setLikeCount] = useState(props.likeCount)

	const handleLike = (mod) => {
		if (mod === 'like') {
			if (!userLikeCase) {setLikeCount(likeCount + 1); setUserLikeCase(true)}
			else {setLikeCount(likeCount - 1); setUserLikeCase(null);}	
			return
		} 
		if (userLikeCase === true) {setLikeCount(likeCount - 1); setUserLikeCase(false)}
		if (userLikeCase === false) {setUserLikeCase(null)} else {setUserLikeCase(false)}
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
					{userLikeCase ? <LikeCommentActive onClick={() => {handleLike('like')}}/> : <LikeComment onClick={() => {handleLike('like')}}/>}
					{likeCount !== 0 && <p style={{marginLeft: '-.5rem'}}>{likeCount}</p>}
					{userLikeCase === false ? <DislikeCommentActive onClick={() => {handleLike('dislike')}} /> : <DislikeComment onClick={() => {handleLike('dislike')}} />}
					<p>ANSWER</p>
				</div>
			</div>
		</div>
	)
}

function CommentsSection(props) {
	
	const [commentListType, setCommentListType] = useState('relevance')

	// For comment input focus animation and comment, cancel button displays
	const [isCommentFocus, setIsCommentFocus] = useState(false)

	// Setting up the value of comment input
	const [newComment, setNewComment] = useState('')
	
	const [userComments, SetUserComments] = useState([])
	
	return(
	<div className='currently-watched--comments'>
				<div className='comments--icons flex' style={{gap: '1.8rem', alignItems: 'center'}}>
					<span className='comments--comment-count'>{props.commentCount && props.commentCount} Comments</span>
					<CommentsSortByDropDown commentListType={commentListType} setCommentListType={setCommentListType}/>
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

export {CommentsSection, Comment}
