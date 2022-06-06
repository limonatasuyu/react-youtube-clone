import videoImg from '../img/example-thumbnail.webp'
import Avatar from '../img/OtherIcons/avatar.jpeg'
import {ReactComponent as Options} from '../img/DropDownIcons/VideoOptions/options.svg'


function VideoThumbnail() {
	return(
		<div className="video-thumbnail">
				<div className="video-img-wrapper">
					<img src={videoImg} alt=""/>
					<div className="video-duration">0:00</div>
				</div>
				<div className="video-details flex">
					<div className="channel-img--thumbnail">
						<img src={Avatar} alt=""/>
					</div>
					<div className="video-details-text">
						<p className="video-name">Web Development Has Gone Crazy aa bb cc dd ee ff gg hh ii jj kk ll mm nn oo pp rr ss tt uu</p>
						<p className="channel-name">Carsen Strange</p>
						<p className="video-details-meta">281K views • 1 month ago </p>
					</div>
					<div className="video-options">
						<Options />
					</div>
				</div>
		</div>
	)
}

export function VideosHome(props) {
	return(
		<div className={props.isMenuViewChanged ? "videos-home flex videos-home--small-menu" : "videos-home flex"}>
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
			<VideoThumbnail />
		</div>
	)
}
