import * as Icon from './ImportHeaderIcons.js'
import { Link } from 'react-router-dom'

export function CreateDropDown() {
	return(
		<div className="create-drop-down drop-down grid">
			<div>
				<div className="flex">
					<Icon.Upload className="header-icon" />
					<span>Upload Video</span>
				</div>
				<div className="flex">
					<Icon.MakeLive className="header-icon"/>
					<span>Go live</span>
				</div>
			</div>
		</div>
	)
}

export function AppsDropDown() {
	return(
		<div className="apps-drop-down drop-down">
			<div className="yt-tv--wrapper flex">
				<Icon.YtTv className="header-icon"/>
				<span>YouTube Tv</span>
			</div>
			<div className="yt-music-kids--wrapper" style={{borderTop: "1px solid #ccc"}}>
				<div className="flex">
					<Icon.YtMusic className="header-icon" />
					<span>YouTube Music</span>
				</div>
				<div className="flex">
					<Icon.YtKids className="header-icon"/>
					<span>Youtube Kids</span>
				</div>
			</div>
			<div className="yt-artists--wrapper flex" style={{borderTop: "1px solid #ccc"}}>
				<div className="flex">
					<Icon.YtForArtists className="header-icon" />
					<span>Youtube For Artists</span>
				</div>
			</div>
		</div>
	)
}

function Notification() {
	return(
		<div className="notification flex">
			<div className="flex">
				<img className="notif-avatar" src={Icon.Avatar} alt="notif-about-small" />
				<div className="notif-detail--wrapper grid">
					<p className="notif-detail">Empfohlen: wendussy</p>
					<p className="notif-time">2 hours ago</p>
				</div>
			</div>
			<div className="notif-thumbnail--wrapper">
				<img className="notif-thumbnail" src={Icon.NotifThumbnail} alt="notif-about-big" />
			</div>
			<div>
				<Icon.Options className="header-icon display-none notif-options"/>
			</div>
		</div>
	)
}

export function NotificationsDropDown() {
	
	var notifications = []
	for (let i=0; i<10; i++) {
		notifications = [...notifications, <Notification />]
	}
	
	return(
		<div className="notif-drop-down drop-down">
			<div className="notif-title flex">
				<span>Notifications</span>
				<Icon.Settings className="header-icon" style={{width: "1.5rem", marginRight: "1.1rem"}}/>
			</div>
			<div className="notif-content">
				{notifications}
			</div>
		</div>
	)
}

export function ProfileDropDown() {
	
	const itemProps = [
		{
			icon: <Icon.YourChannel/>,
			text: "Your Channel",
			isNavigatable: false,
		},
		{
			icon: <Icon.Purchases/>,
			text: "Purchases and memberships",
			isNavigatable: false,
		},
		{
			icon: <Icon.YtStudio/>,
			text: "YouTube Studio",
			isNavigatable: false,
		},
		{
			icon: <Icon.SwitchAccount/>,
			text: "Switch account",
			isNavigatable: true,
		},
		{
			icon: <Icon.SignOut/>,
			text: "Sign out",
			isNavigatable: false,
		},
		{
			icon: <Icon.Appearance/>,
			text: "Appearance: Light",
			isNavigatable: true,
		},
		{
			icon: <Icon.Language/>,
			text: "Language: English",
			isNavigatable: true,
		},
		{
			icon: <Icon.Location/>,
			text: "Location: USA",
			isNavigatable: false,
		},
		{
			icon: <Icon.SettingsProfile/>,
			text: "Settings",
			isNavigatable: false,
		},
		{
			icon: <Icon.YourData/>,
			text: "Your data in YouTube",
			isNavigatable: false,
		},
		{
			icon: <Icon.Help/>,
			text: "Help",
			isNavigatable: false,
		},
		{
			icon: <Icon.Feedback/>,
			text: "Send feedback",
			isNavigatable: false,
		},
		{
			icon: <Icon.Shortcuts/>,
			text: "Keyboard shortcuts",
			isNavigatable: false,
		},
	]
	const items = itemProps.map((item, index) => {
		return(
			<div className="profile-dd-item flex" key={index}>
				<div className="flex">
					<svg className="header-icon main-icon--dd">{item.icon}</svg>
					<p>{item.text}</p>
				</div>
				{item.isNavigatable ? <Icon.NavigateR className="header-icon nav-icon-dd" /> : <div/>}
			</div>
		)
	})

	return(
		<div className="profile-drop-down drop-down">
			<div className="profile-dd-header flex">
				<img src={Icon.Avatar} alt="drop-down-icon" />
					<div>
						<p>SomeOne</p>
						<Link to="idk">Manage your Google Account</Link>
					</div>
			</div>
			<div className="profile-dd-items-1">
				{items.slice(0, 5)}
			</div>
			<div className="profile-dd-items-2" style={{borderTop: "1px solid #ccc", marginTop: "0.6rem"}}>
				{items.slice(5, 15)}
			</div>
			<div className="profile-dd-items-3" style={{borderTop: "1px solid #ccc", marginTop: "0.6rem"}}>
				<div className="profile-dd-item flex">
					<p style={{marginLeft: "1rem"}}>Restricted Mode: off</p>
					<Icon.NavigateR className="header-icon nav-icon-dd" />
				</div>
			</div>		
		</div>
	)
}
