import VideoThumbnailChunk from './VideoThumbnails'
import {useEffect, useState} from 'react'
import * as Icon from './ImportIcons'
import Avatar from '../../img/OtherIcons/avatar.jpeg'
import {motion} from 'framer-motion'
// Thumbnails in HomePage needs to be loaded by chunks in order to maintain the 'load onScrollEnd' functionality
// It basically means saying the computer 'when user gets end of the screen load new thumbnails'   
function LoadThumbnail(props) {
	
	// Setting the state for the chunk after this one needs mounting or not
	const [isChunkNeedsMount, setIsChunkNeedsMount] = useState(false)

	// isChunkNeedsMount needs to change once so i'm using useEffect hook
	useEffect(() => {
		
		const abortController = new AbortController();
		
		// Function for detecting if user is on end of the page or not 
		// It also deletes the event listener when it's done to prevent unusing eventlistener to use memory (or something i don't really know how eventlisteners uses memory but it sounds good to deleting an unusing thing)
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


const text = `
Explore a universe from the cosmic dawn to life at the end of time. A breakdown of Lucas Roussel’s surreal worldbuilding epic ‘Rust and Humus.’
---
Read 'Rust and Humus': https://volgoutlh.artstation.com/proj...
Lucas Roussel’s Artstation: https://www.artstation.com/volgoutlh
Lucas Roussel’s Instagram: https://www.instagram.com/kanarmajik/

If you could witness time from the Big Bang to the last star going out, what moments would stay with you the most? What would you still remember, even as space grew dark and empty? What meaning — if any — would you glean from all of cosmic history?

‘Rust and Humus’ is a worldbuilding project that explores a dreamlike universe from the cosmic dawn to life at the end of time. Created by the visionary artist and writer Lucas Roussel and translated by Laura Remy, it is perhaps the most surreal exercise in worldbuilding I’ve ever encountered. Over the course of the project’s one-hundred and twenty-three pages, long forgotten gods create life on barren worlds, mortals build cosmic horrors beyond comprehension, and whales born from dreams visit magician butterflies on the moon.

Yet in exploring this strange narrative, a profound meditation on the weight of time and the cyclical nature of history emerges. So, for this entry into the archive, I’ll present ‘Rust and Humus’ from start to end. And since nothing can prepare you for what lies within, I feel we should just get started…

0:00 Of Rust and Humus
1:19 The Cosmic Tree
2:47 The Green Moon
4:09 The White Moon
5:50 The Titan’s Era
7:20 The Giant’s Era
9:29 The Ancient’s Era 
11:40 The Modern Epoch
14:30 The Age of Rust
16:36 The Humus Era
17:51 Time’s End
19:13 What Comes After?

Copyright Disclaimer: Under section 107 of the Copyright Act 1976, allowance is made for “fair use” for purposes such as criticism, comment, news reporting, teaching, scholarship, education, and research. All video/image content is edited under fair use rights for reasons of commentary.

I do not own the images, music, or footage used in this video. All rights and credit goes to the original owners.

♫ Music by Kevin MacLeod (incompetech.com): 
Beauty Flow, Firesong, Impact Lento, Majestic Hills, Thunderbird, Bittersweet, Floating Cities
Licensed under Creative Commons: By Attribution 3.0
http://creativecommons.org/licenses/b...  

#CuriousArchive #Worldbuilding #Rustandhumus"
`;

export function CurrentlyWatchedVideo(props) {
	
	const [isShowinMore, setIsShowinMore] = useState(false)
	
	const Comment = (props) => {
		const comment = props.comment
	return (
		<div className='video-comments--single-comment flex'>
			<div className='flex'>
				<div className='single-comment--commenter-avatar'>
					<img src={Avatar}/>
				</div>
				<div className='single-comment--commenter-avatar'>
					someOne
				</div>
			</div>
			
			<div className='single-comment--comment' >
				{comment}
			</div>
		</div>
	)} 
	
	
	const [newComment, setNewComment] = useState('')
	const [commentList, setCommentList] = useState([<Comment comment='test 1' />, <Comment comment='test 2' />, <Comment comment='test 3' />])
	
	const [isCommentFocus, setIsCommentFocus] = useState(false)
	
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
							<img src={Avatar} className='description-area--channel-pic'/>
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
				<div className='flex' style={{gap: '1.8rem', alignItems: 'center'}}>
					<span className='comments--comment-count'>152 Comments</span>
					<div className='comments--icon flex'>
						<Icon.Sortby />
						<span>SORT BY</span>
					</div>
				</div>
				<div className='comments--user-comment flex'>
					<img src={Avatar} />
					<div>
						<input 
						placeHolder='Add a comment...'
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
				<div className='comments--video-comments'>
					{commentList}
				</div>
			</div>
		</div>
	)
}













