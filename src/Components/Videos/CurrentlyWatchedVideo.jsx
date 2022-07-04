import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {useOutsideClick} from '../../Helpers/CustomHooks'
import {getTimeChange} from '../../Helpers/HelperFunctions'

import * as Icon from './ImportIcons'
import noImg from '../../img/OtherIcons/no-image.png'
import Avatar from '../../img/OtherIcons/avatar.jpeg'

import text from './text(willBeDeleted)'
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
					<div className='comment-details--comment-date'>{getTimeChange(props.date)} ago {props.isChanged && '(edited)'}</div>
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

const EmbedVideo = (props) => {

	return (
	<iframe 
		id='embedVideo'
		src={`https://www.youtube.com/embed/${props.videoId}`} 
		title="YouTube video player" 
		frameBorder="0" 
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
		allowFullScreen
	/>
	)
}

export function CurrentlyWatchedVideo(props) {
	
	const [isShowinMore, setIsShowinMore] = useState(false)
	
	
	const [newComment, setNewComment] = useState('')
	const [commentList, setCommentList] = useState([])
	
	const [commentListType, setCommentListType] = useState('relevance')
	
	function getComments(type) {
	axios.get(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=${type}&videoId=${props.videoId}&key=${api_key}`)
			.then((res) => {
				console.log(res)
				
				var comList = res.data.items.map((item, index) => {
					return <Comment
					key={index}
					comment={item.snippet.topLevelComment.snippet.textOriginal}
					date={item.snippet.topLevelComment.snippet.publishedAt}
					isChanged={item.snippet.topLevelComment.snippet.publishedAt !== item.snippet.topLevelComment.snippet.updatedAt}
					commenterName={item.snippet.topLevelComment.snippet.authorDisplayName}
					commenterAvatar={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
					likeCount={item.snippet.topLevelComment.snippet.likeCount}
					/>
				})
				
				setCommentList(comList)
			})
			.catch((err) => {console.log(err)})
				.then(() => {console.log('comment request made')})
	
	}
	
	useEffect(() => {getComments(commentListType)}, [])
	
	const [isCommentFocus, setIsCommentFocus] = useState(false)

	// SortBy Drop Down Setup
	const [isSortByDropDownShowing, setIsSortByDropDownShowing] = useState(false)
	const sortByDropDownRef = useRef(null)
	useOutsideClick(sortByDropDownRef, () => setIsSortByDropDownShowing(false))
	
	return(
		<div className='embed-video--container'>
			<EmbedVideo videoId={props.videoId}/>
			<h1 className='currently-watched--video-title'>The Surreal World of Rust and Humus</h1>
			<div className='flex' style={{justifyContent: 'space-between'}}>
				<div className='video-details-meta'>311,193 views • May 6, 2022</div>
				<div className='currently-watched--icons flex'>
					<div className='flex' ><Icon.Like /> <p>20 K</p></div>
					<div className='flex' ><Icon.Dislike /> <p>DISLIKE</p></div>
					<div className='flex' ><Icon.Share /> <p>SHARE</p></div>
					<div className='flex' ><Icon.Clip /> <p>CLIP</p></div>
					<div className='flex' ><Icon.Save /> <p>SAVE</p></div>
					<div className='flex' ><Icon.Other /></div>
				</div>
			</div>
			<div className='currently-watched--description-area'>
				<div className='description-area--channel-data'>
					<div className='flex' style={{alignItems: 'center', justifyContent: 'space-between'}}>
						<div className='flex' style={{gap: '1rem'}}>
							<img src={Avatar} className='description-area--channel-pic' alt='channel-avatar'/>
							<div className='channel-data--text grid'>
								<span>Curious Archive</span>
								<span>299K subscribers</span>
							</div>
						</div>
						<div className='subscribe-button'>SUBSCRIBE</div>
					</div>
				</div>
				<div className='description-area--description'>
						{ !isShowinMore ?
						<>
						{text.split('\n').slice(0, 3).join('\n')}
						<p className='description-area--show-more' onClick={() => {setIsShowinMore(true)}}>SHOW MORE</p>
						</>
						:
						<>
						{text}
						<p className='description-area--show-more' onClick={() => {setIsShowinMore(false)}}>SHOW LESS</p>
						</>
						}
				</div>
			</div>
			<div className='currently-watched--comments'>
				<div className='comments--icons flex' style={{gap: '1.8rem', alignItems: 'center'}}>
					<span className='comments--comment-count'>152 Comments</span>
					<div className='comments--icon flex' onClick={() => {
					setTimeout(() => {setIsSortByDropDownShowing(!isSortByDropDownShowing)}, 0)}}>
						<Icon.Sortby />
						{isSortByDropDownShowing && 
							<div ref={sortByDropDownRef} className='sort-by--drop-down drop-down'>
								<div onClick={() => {if (commentListType !== 'relevance') {getComments('relevance'); setCommentListType('relevance')} }}>
									<p>Best Reviews</p>
								</div>
								<div onClick={() => {if (commentListType !== 'time') {getComments('time'); setCommentListType('time')} }}>
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
							onClick={() => {setCommentList([...commentList, <Comment comment={newComment} />]); setNewComment('')}} 
							style={(newComment.length !== 0) ? {backgroundColor: '#065fd4', color: 'white'} : {}}
							>COMMENT</button>
						</div>
					</div>	
				</div>
				<div className='comments--video-comments grid'>
					{commentList}
				</div>
			</div>
		</div>
	)
}
