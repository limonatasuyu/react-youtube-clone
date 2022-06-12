//import videoImg from '../img/example-thumbnail.webp'
import Avatar from '../img/OtherIcons/avatar.jpeg'
import {ReactComponent as Options} from '../img/DropDownIcons/VideoOptions/options.svg'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import jsonData from '../data.json'

const api_key = 'apiKey'

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


function VideoThumbnail(props) {

	const data = props.data
	var presentTime = formatDate(Date())
	var publishDate = data.snippet.publishedAt
	console.log(publishDate)
	return(
		<Link to={data ? `/watch?q=${data.id}` : "/"} className="video-thumbnail" style={{textDecoration: "none", color: "Black"}}>
				<div className="video-img-wrapper video-img-wrapper-test">
					<img src={data && data.snippet.thumbnails.high.url} alt=""/>
					<div className="video-duration">0:00</div>
				</div>
				<div className="video-details flex">
					<div className="channel-img--thumbnail">
						<img src={Avatar} alt=""/>
					</div>
					<div className="video-details-text">
						<p className="video-name">{data ? data.snippet.title : "not found"}</p>
						<p className="channel-name">{data ? data.snippet.channelTitle : "not found"}</p>
						<p className="video-details-meta">281K views • 1 month ago </p>
					</div>
					<div className="video-options">
						<Options />
					</div>
				</div>
		</Link>
	)
}

export function VideosHome(props) {

	const [videoData, setData] = useState([])
	
	useEffect(() => {
		
		let arr = []
		function getVideoData(videoCount) {
			let arrClosure;
			let idArray = []
			for (let i=0; i < videoCount; i++) {idArray.push(jsonData[Math.floor(Math.random() * (jsonData.length + 1))])}
			axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${idArray}&key=${api_key}`)
				.then((res) => {
				if (idArray.length - res.data.items.length !== 0) {getVideoData(idArray.length - res.data.items.length)}
				arrClosure = arr.concat(res.data.items)
				arr = arrClosure
				setData(arrClosure)
			})
				.catch((err) => {console.log(err)})
					.then(() => {console.log("request made")})
		}
		
		getVideoData(16)
	}, [])

	var videothumbnails = []

	if (videoData.length !== 0) {
		videothumbnails = videoData.map((item, index) => {
			return(
			<VideoThumbnail key={index} data={item}/>
			)
		})
	}
	
	return(
		<div className={props.isMenuViewChanged ? "videos-home flex videos-home--small-menu" : "videos-home flex"}>
			{videothumbnails}
		</div>
	)
}
