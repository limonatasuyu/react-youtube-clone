import * as Icon from './ImportHeaderIcons'
import { Link } from 'react-router-dom'
import { useState, useRef} from 'react'
import {useOutsideClick} from '../CustomHooks'


function CreateDropDown() {
	return(
		<div className=" create-drop-down drop-down grid">
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

function AppsDropDown() {
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
				<img className="notif-avatar" src={Icon.Avatar} />
				<div className="notif-detail--wrapper grid">
					<p className="notif-detail">Empfohlen: wendussy</p>
					<p className="notif-time">2 hours ago</p>
				</div>
			</div>
			<div className="notif-thumbnail--wrapper">
				<img className="notif-thumbnail" src={Icon.NotifThumbnail} />
			</div>
			<div>
				<Icon.Options className="header-icon display-none notif-options"/>
			</div>
		</div>
	)
}

function NotificationsDropDown() {
	return(
		<div className="notif-drop-down drop-down">
			<div className="notif-title flex">
				<span>Notifications</span>
				<Icon.Settings className="header-icon" style={{width: "1.5rem", marginRight: "1.1rem"}}/>
			</div>
			<div className="notif-content">
				<Notification />
				<Notification />
				<Notification />
				<Notification />
				<Notification />
				<Notification />
				<Notification />
				<Notification />
				<Notification />
			</div>
		</div>
	)
}

function ProfileDropDown() {
	
	const itemProps = [
		{
			icon: <Icon.YourChannel className="header-icon main-icon--dd"/>,
			text: "Your Channel",
			isNavigatable: false,
			key: 0
		},
		{
			icon: <Icon.Purchases className="header-icon main-icon--dd"/>,
			text: "Purchases and memberships",
			isNavigatable: false,
			key: 1
		},
		{
			icon: <Icon.YtStudio className="header-icon main-icon--dd"/>,
			text: "YouTube Studio",
			isNavigatable: false,
			key: 2
		},
		{
			icon: <Icon.SwitchAccount className="header-icon main-icon--dd"/>,
			text: "Switch account",
			isNavigatable: true,
			key: 3
		},
		{
			icon: <Icon.SignOut className="header-icon main-icon--dd"/>,
			text: "Sign out",
			isNavigatable: false,
			key: 4
		},
		{
			icon: <Icon.Appearance className="header-icon main-icon--dd"/>,
			text: "Appearance: Light",
			isNavigatable: true,
			key: 5
		},
		{
			icon: <Icon.Language className="header-icon main-icon--dd"/>,
			text: "Language: English",
			isNavigatable: true,
			key: 6
		},
		{
			icon: <Icon.Location className="header-icon main-icon--dd"/>,
			text: "Location: USA",
			isNavigatable: false,
			key: 7
		},
		{
			icon: <Icon.SettingsProfile className="header-icon main-icon--dd"/>,
			text: "Settings",
			isNavigatable: false,
			key: 8
		},
		{
			icon: <Icon.YourData className="header-icon main-icon--dd"/>,
			text: "Your data in YouTube",
			isNavigatable: false,
			key: 9
		},
		{
			icon: <Icon.Help className="header-icon main-icon--dd"/>,
			text: "Help",
			isNavigatable: false,
			key: 10
		},
		{
			icon: <Icon.Feedback className="header-icon main-icon--dd"/>,
			text: "Send feedback",
			isNavigatable: false,
			key: 11
		},
		{
			icon: <Icon.Shortcuts className="header-icon main-icon--dd"/>,
			text: "Keyboard shortcuts",
			isNavigatable: false,
			key: 12
		},
	]
	const items = itemProps.map((item) => {
		return(
			<div className="profile-dd-item flex" key={item.key}>
				<div className="flex">
					{item.icon}
					<p>{item.text}</p>
				</div>
				{item.isNavigatable ? <Icon.NavigateR className="header-icon nav-icon-dd" /> : <div/>}
			</div>
		)
	})

	return(
		<div className="profile-drop-down drop-down">
			<div className="profile-dd-header flex">
				<img src={Icon.Avatar} />
					<div>
						<p>SomeOne</p>
						<a href="#">Manage your Google Account</a>
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

// Add Search by voice
export default function Header(props) {

	const [isSearchEmpty, setisSearchEmpty] = useState(true)
	const [searchValue, setSearchValue] = useState("")
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const searchInput = useRef(null);
	
	function handleSearch(event) {
		setSearchValue(event.target.value)
		if (event.target.value.length !== 0) { setisSearchEmpty(false) }
		else {setisSearchEmpty(true)}
	}
	
	function clearSearch() {
		setSearchValue("")
		setisSearchEmpty(true)
		searchInput.current.focus();
	}
	
	//Create Drop Down Setup
	const [isCreateDropDownOpen, setIsCreateDropDownOpen] = useState(false)
	const createDropDownRef = useRef(null)
	useOutsideClick(createDropDownRef, () => setIsCreateDropDownOpen(false))
	//Apps Drop Down Setup
	const [isAppsDropDownOpen, setIsAppsDropDownOpen] = useState(false)
	const appsDropDownRef = useRef(null)
	useOutsideClick(appsDropDownRef, () => setIsAppsDropDownOpen(false))
	//Notifications Drop Down Setup
	const [isNotifDropDownOpen, setIsNotifDropDownOpen] = useState(false)
	const NotifDropDownRef = useRef(null)
	useOutsideClick(NotifDropDownRef, () => setIsNotifDropDownOpen(false))
	//Profile Drop Down Setup
	const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false)
	const profileDropDownRef = useRef(null)
	useOutsideClick(profileDropDownRef, () => setIsProfileDropDownOpen(false))


	return(
		<div className={isSearchOpen ? "Header-wrapper flex search-open--small-screen" : "Header-wrapper flex"}>
			<div className="first-header-container flex">
				<Icon.Menu className="header-icon menu-icon" onClick={props.handleMenu}/>
				<Link to="/"><Icon.Logo className="header-icon logo" /></Link>
			</div>
			<div className="second-header-container flex">
				<form action="/result" className="search-form flex">
					<Icon.BackArrow className="header-icon display-none header-arrow-icon" onClick={() => setIsSearchOpen (false)}/>
					<div className="search-box flex">
						<Icon.Search className="header-icon display-none input-search-icon" />
						<input className={!isSearchEmpty ? "search-input none-empty-690" : "search-input"} placeholder="Search" onChange={handleSearch} value={searchValue} ref={searchInput}/>
						<div className="clear-search-wrapper">
							<Icon.ClearSearch onClick={clearSearch} className={!isSearchEmpty ? "header-icon clear-search-icon" : "display-none"}/>
						</div>
					</div>
					<button className="search-button"><Icon.Search className="header-icon" /></button>
				</form>
				<Icon.Search className="header-icon display-none search-button-656" onClick={() => {setIsSearchOpen(true); searchInput.current.focus();}}/>
				<Icon.Mic className="header-icon mic-icon" />
			</div>
			<div className="third-header-container flex">
				{!isCreateDropDownOpen ? 
				<Icon.Camera className="header-icon camera-icon" onClick={() => setTimeout(() => {setIsCreateDropDownOpen(true)}, 0)}/>
                                                                 /* Waits for useOutsideClick callback to being executed */
					:
					<div ref={createDropDownRef}>
						<Icon.CameraActive className="header-icon camera-icon" onClick={() => setIsCreateDropDownOpen(false)}/>
						<CreateDropDown />
					</div>
				}
				{!isAppsDropDownOpen ?
				<Icon.Apps className="header-icon apps-icon" onClick={() => setTimeout(() => {setIsAppsDropDownOpen(true)}, 0)}/>
				:
				<div ref={appsDropDownRef}>
					<Icon.AppsActive className="header-icon apps-icon" onClick={() => setIsAppsDropDownOpen(false)}/>
					<AppsDropDown />
				</div>
				
				}
				{!isNotifDropDownOpen ?
				<Icon.Notifications className="header-icon notifications" onClick={() => setTimeout(() => {setIsNotifDropDownOpen(true)}, 0)}/>
				:
					<div ref={NotifDropDownRef}>
						<Icon.NotificationsActive className="header-icon notifications" onClick={() => setIsNotifDropDownOpen(false)}/>
						<NotificationsDropDown/>
					</div>
				}
				{!isProfileDropDownOpen ?
				<img src={Icon.Avatar} className="header-icon avatar--header" alt="user-avatar" onClick={() => setTimeout(() => {setIsProfileDropDownOpen(true)}, 0)}/>
				:
					<div ref={profileDropDownRef}>
						<img src={Icon.Avatar} className="header-icon avatar--header avatar-active--header" alt="user-avatar" onClick={() => setIsProfileDropDownOpen(false)}/>
						<ProfileDropDown />
					</div>
				}
			</div>
		</div>
	)
}
