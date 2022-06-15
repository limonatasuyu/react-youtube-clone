//import videoImg from '../img/example-thumbnail.webp'
import Avatar from '../img/OtherIcons/avatar.jpeg'
import {ReactComponent as Options} from '../img/DropDownIcons/VideoOptions/options.svg'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {shortenNumber, getTimeChange, getDurationObj} from '../HelperFunctions'



function VideoThumbnail(props) {

	const data = props.data
	var publishDate = data.snippet.publishedAt.slice(0, data.snippet.publishedAt.length - 4)
	const duration = getDurationObj(data.contentDetails.duration)
	
	return(
		<Link to={data ? `/watch?q=${data.id}` : "/"} className="video-thumbnail" style={{textDecoration: "none", color: "Black"}}>
				<div className="video-img-wrapper video-img-wrapper-test">
					<img src={data.snippet.thumbnails.high.url} alt=""/>
					<div className="video-duration">{duration.Hours !== "0" ? duration.Hours + ":" : ""}{duration.Minutes}:{duration.Seconds}</div>
				</div>
				<div className="video-details flex">
					<div className="channel-img--thumbnail">
						<img src={props.channelData.snippet.thumbnails.high.url} alt=""/>
					</div>
					<div className="video-details-text">
						<p className="video-name">{data.snippet.title}</p>
						<p className="channel-name">{data.snippet.channelTitle}</p>
						<p className="video-details-meta">{shortenNumber(data.statistics.viewCount)} views • {getTimeChange(publishDate)} ago </p>
					</div>
					<div className="video-options">
						<Options />
					</div>
				</div>
		</Link>
	)
}

export function VideosHome(props) {

	const videoData = props.videoData
	const channelData = props.channelData

	var videothumbnails = []

	if (videoData.length === 16 && channelData.length !== 0) {
		
		
		// Creating ordered arrays of data
		var channelDataProp = [];
		var videoDataProp = [];
		for (let i of channelData) {
			for (let a  of videoData) {
				if (i.snippet.title === a.snippet.channelTitle) {
					channelDataProp.push(i)
					videoDataProp.push(a)
				}
			}
		}
		videothumbnails = videoDataProp.map((item, index) => {
			return(
			<VideoThumbnail key={index} data={item} channelData={channelDataProp[index]}/>
			)
		})
	}
	
	return(
		<div className={props.isMenuViewChanged ? "videos-home flex videos-home--small-menu" : "videos-home flex"}>
			{videothumbnails}
		</div>
	)
}
