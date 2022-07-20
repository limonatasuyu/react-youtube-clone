import {useState} from 'react'
import {shortenNumber, parseISOString} from '../../Helpers/HelperFunctions'

import * as Icon from './ImportIcons'
import noImg from '../../img/OtherIcons/no-image.png'


export function CurrentlyWatchedVideo(props) {

	const videoData = props.videoData
	const channelData = props.channelData
	
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
				<VideoDetailsMeta videoData={videoData}/>
				</div>
				<div className='currently-watched--icons flex'>
					<div className='flex' ><Icon.Like /> <p>{videoData && shortenNumber(videoData.statistics.likeCount)}</p></div>
					<div className='flex' ><Icon.Dislike /> <p>DISLIKE</p></div>
					<div className='flex download-icon' ><Icon.Download /> <p>DOWNLOAD</p></div>
					<div className='flex' ><Icon.Share /> <p>SHARE</p></div>
					<div className='flex clip-icon' ><Icon.Clip /> <p>CLIP</p></div>
					<div className='flex' ><Icon.Save /> <p>SAVE</p></div>
					<div className='flex' ><Icon.Other /></div>
				</div>
			</div>
			{window.innerWidth <= 1015 && <DescriptionArea channelData={channelData && channelData} videoData={videoData && videoData} />}
		</div>
	)
}

export function DescriptionArea(props) {
	
	const channelData = props.channelData
	const videoData = props.videoData
	
	// Setting up the read more button for description
	const [isShowinMore, setIsShowinMore] = useState(false)
	
	return(
		<div style={{marginTop: '1.5rem'}} className='currently-watched--description-area'>
			<div className='description-area--channel-data'>
				<div className='flex' style={{alignItems: 'center', justifyContent: 'space-between'}}>
					<div className='flex' style={{gap: '1rem'}}>
						<img src={channelData ? channelData.snippet.thumbnails.default.url : noImg} onError={(e) => { e.target.onerror = null; e.target.src = noImg}} className='description-area--channel-pic' alt='channel-avatar'/>	
						<div className='channel-data--text grid'>
							<span>{props.videoData && videoData.snippet.channelTitle}</span>
							<span>{props.channelData && shortenNumber(channelData.statistics.subscriberCount)} subscriber</span>
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
	)
}

function VideoDetailsMeta(props) {

	const videoData = props.videoData

	return(<>
	{props.videoData && <>
					{(window.innerWidth > 500 && window.innerWidth < 545) && <>{shortenNumber(videoData.statistics.viewCount)}</>}
					{(window.innerWidth >= 545 && window.innerWidth < 571) && <>{shortenNumber(videoData.statistics.viewCount) + ' views...'}</>}
					{(window.innerWidth > 625 && window.innerWidth < 640) && <>{shortenNumber(videoData.statistics.viewCount)}</>}
					{(window.innerWidth > 705 && window.innerWidth < 720) && <>{shortenNumber(videoData.statistics.viewCount)}</>}
					{(window.innerWidth >= 720 && window.innerWidth < 840) && <>{shortenNumber(videoData.statistics.viewCount) + ' views...'}</>}
					{(window.innerWidth >= 840 && window.innerWidth < 1015) && <>{shortenNumber(videoData.statistics.viewCount) + ' views • ' + String(parseISOString(videoData.snippet.publishedAt)).split(' ').slice(0, 3).join(' ')}</>}
					{(window.innerWidth >= 1015 && window.innerWidth < 1055) && <>{shortenNumber(videoData.statistics.viewCount) + ' views...'}</>}
					{(window.innerWidth >= 1055 && window.innerWidth < 1085) && <>{shortenNumber(videoData.statistics.viewCount) + ' views • ' + String(parseISOString(videoData.snippet.publishedAt)).split(' ').slice(0, 3).join(' ')}</>}
					{(window.innerWidth > 1130 && window.innerWidth < 1185) && <>{shortenNumber(videoData.statistics.viewCount)}</>}
					{(window.innerWidth >= 1185 && window.innerWidth < 1220) && <>{shortenNumber(videoData.statistics.viewCount) + ' views...'}</>}
					{window.innerWidth >= 1220 && <>{shortenNumber(videoData.statistics.viewCount) + ' views • ' + String(parseISOString(videoData.snippet.publishedAt)).split(' ').slice(0, 3).join(' ')}</>}
					</>}</>
	)
}
