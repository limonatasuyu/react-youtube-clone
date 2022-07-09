import {Comments} from './Comments'

import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {useOutsideClick} from '../../Helpers/CustomHooks'
import {getTimeChange, shortenNumber, parseISOString} from '../../Helpers/HelperFunctions'

import * as Icon from './ImportIcons'
import noImg from '../../img/OtherIcons/no-image.png'
import Avatar from '../../img/OtherIcons/avatar.jpeg'
import {api_key} from '../../apiKey'

export function CurrentlyWatchedVideo(props) {
	
	// Setting up the read more button for description
	const [isShowinMore, setIsShowinMore] = useState(false)

	const [videoData, setVideoData] = useState(null)
	const [channelData, setChannelData] = useState(null)

	// Defining functions for fetching and setting the data
	function getVideoData() {
		
		axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet, statistics, contentDetails&id=${props.videoId}&key=${api_key}`)
			.then((res) => {setVideoData(res.data.items[0])})
			.catch((err) => {console.log(err)})
				.then((res) => {console.log('request for single video made')})
	}

	function getChannelData() {
		if (videoData)
		axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics, snippet&id=${videoData.snippet.channelId}&key=${api_key}`)
			.then((res) => {setChannelData(res.data.items[0])})
			.catch((err) => {console.log(err)})
				.then(() => {console.log('channel request for single video made')})
	}

	// Fetching and setting the data
	useEffect(() => {getVideoData()}, [])
	// For fetching the data about channel there is a need for fetching and setting the data about video
	useEffect(() => {getChannelData()}, [videoData])
	
	return(
		<div className='embed-video--container'>
			<iframe 
				id='embedVideo'
				src={`https://www.youtube.com/embed/${props.videoId}`} 
				title="YouTube video player" 
				frameBorder="0" 
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
				allowFullScreen
			/>
			<h1 className='currently-watched--video-title'>{videoData && videoData.snippet.title}</h1>
			<div className='flex' style={{justifyContent: 'space-between'}}>
				<div className='video-details-meta'>
					{videoData && shortenNumber(videoData.statistics.viewCount)} views • 
					{videoData && " " + String(parseISOString(videoData.snippet.publishedAt)).split(' ').slice(0, 3).join(' ')}
				</div>
				<div className='currently-watched--icons flex'>
					<div className='flex' ><Icon.Like /> <p>{videoData && shortenNumber(videoData.statistics.likeCount)}</p></div>
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
							<img src={channelData ? channelData.snippet.thumbnails.default.url : noImg} onError={(e) => { e.target.onerror = null; e.target.src = noImg}} className='description-area--channel-pic' alt='channel-avatar'/>	
							<div className='channel-data--text grid'>
								<span>{videoData && videoData.snippet.channelTitle}</span>
								<span>{channelData && shortenNumber(channelData.statistics.subscriberCount)} subscriber</span>
							</div>
						</div>
						<div className='subscribe-button'>SUBSCRIBE</div>
					</div>
				</div>
				<div className='description-area--description'>
						{!isShowinMore ?
						<>
						{videoData && videoData.snippet.description.split('\n').slice(0, 3).join('\n')}
						<p className='description-area--show-more' onClick={() => {setIsShowinMore(true)}}>SHOW MORE</p>
						</>
						:
						<>
						{videoData.snippet.description}
						<p className='description-area--show-more' onClick={() => {setIsShowinMore(false)}}>SHOW LESS</p>
						</>
						}
				</div>
			</div>
			<Comments videoData={videoData} videoId={props.videoId}/>
		</div>
	)
}
