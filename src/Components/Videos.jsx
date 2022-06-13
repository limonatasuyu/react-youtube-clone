//import videoImg from '../img/example-thumbnail.webp'
import Avatar from '../img/OtherIcons/avatar.jpeg'
import {ReactComponent as Options} from '../img/DropDownIcons/VideoOptions/options.svg'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import jsonData from '../data.json'


const api_key = 'api_key'

function shortenNumber(num) {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], b[1], b[2], b[3], b[4]));
}

function getTimeChange(date) {
	var presentTime = new Date(),
	presentYear = presentTime.getUTCFullYear(),
	presentMonth = presentTime.getUTCMonth(),
	presentDay = presentTime.getUTCDate(),
	presentHour = presentTime.getUTCHours(),
	presentMinute = presentTime.getUTCMinutes();
	
	var calcDate = parseISOString(date),	
	calcYear = calcDate.getUTCFullYear(),
	calcMonth = calcDate.getUTCMonth(),
	calcDay = calcDate.getUTCDate(),
	calcHour = calcDate.getUTCHours(),
	calcMinute = calcDate.getUTCMinutes();
	
	if (calcYear != presentYear) {return String(presentYear - calcYear) + " Years"}
	if (calcMonth != presentMonth) {return String(presentMonth - calcMonth) + " Months"}
	if (calcDay != presentDay) {return String(presentDay - calcDay) + " Days"}
	if (calcHour != presentHour) {return String(presentHour - calcHour) + " Hours"}
	return String(presentMinute - calcMinute) + " Minutes"
}


function VideoThumbnail(props) {

	const data = props.data
	var publishDate = data.snippet.publishedAt.slice(0, data.snippet.publishedAt.length - 4)
	//console.log(data)
	var duration = data.contentDetails.duration
	duration = duration.slice(0, duration.length - 1).slice(2)
	var someInt;
	if (duration.split('H').length === 1) {someInt = 0} else {someInt = 1}
	var durationList = [duration.split('H')[0], ...(duration.split('H')[someInt].split('M'))]
	console.log(durationList)
	return(
		<Link to={data ? `/watch?q=${data.id}` : "/"} className="video-thumbnail" style={{textDecoration: "none", color: "Black"}}>
				<div className="video-img-wrapper video-img-wrapper-test">
					<img src={data.snippet.thumbnails.high.url} alt=""/>
					<div className="video-duration">0:00</div>
				</div>
				<div className="video-details flex">
					<div className="channel-img--thumbnail">
						<img src={Avatar} alt=""/>
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

	const [videoData, setData] = useState([])
	
	useEffect(() => {
		
		let arr = []
		function getVideoData(videoCount) {
			let arrClosure;	
			let idArray = []
			for (let i=0; i < videoCount; i++) {idArray.push(jsonData[Math.floor(Math.random() * (jsonData.length + 1))])}
			axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet, statistics, contentDetails&id=${idArray}&key=${api_key}`)
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
		
		
		//let idArray = []
		//for (let i=0; i < 2; i++) {idArray.push(jsonData[Math.floor(Math.random() * (jsonData.length + 1))])}
		//axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${idArray}&key=${api_key}`).then(res => console.log(res))
		
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
