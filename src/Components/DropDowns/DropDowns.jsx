import * as Icon from './ImportIcons.js'
import { Link } from 'react-router-dom'
import {useState, useRef} from 'react'
import {useOutsideClick} from '../../Helpers/CustomHooks'

function DropDownTemplate(props) {

	const [isDropDownOpen, setIsDropDownOpen] = useState(false)
	const dropDownRef = useRef(null)
	useOutsideClick(dropDownRef, () => setIsDropDownOpen(false))

	return (
	<>
	{!isDropDownOpen ?							/* Waits for useOutsideClick callback to be executed */
	<div onClick={() => {setTimeout(() => {setIsDropDownOpen(true)}, 0)}}>{props.Logo}</div>
	:
	<div ref={dropDownRef}>
		{
		<>
		<div onClick={() => setIsDropDownOpen(false)}>{props.LogoActive}</div>
		{props.Content}
		</>
		}
	</div>
	}
	</>
	)
}

export function CreateDropDown() {
	
	return(<DropDownTemplate
		Logo={<Icon.Camera className="header-icon camera-icon"/>}
		LogoActive={<Icon.CameraActive className="header-icon camera-icon" />}
		Content={
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
		</div>}
	/>
	)
}

export function AppsDropDown() {
	
	return(<DropDownTemplate
		Logo={<Icon.Apps className="header-icon apps-icon"/>}
		LogoActive={<Icon.AppsActive className="header-icon apps-icon"/>}
		Content={
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
		</div>}
	/>)
}

export function NotificationsDropDown() {
	
	const Notification = () => {return(
		<div className="notification flex">
			<div className="flex">
				<img className="notif-avatar" src={Icon.Avatar} alt="notif-about-small" />
				<div className="notif-detail--wrapper grid">
					<p className="notif-detail">something happened</p>
					<p className="notif-time">some time ago</p>
				</div>
			</div>
			<div className="notif-thumbnail--wrapper">
				<img className="notif-thumbnail" src={Icon.NotifThumbnail} alt="notif-about-big" />
			</div>
			<div>
				<Icon.Options className="header-icon display-none notif-options"/>
			</div>
		</div>
	)}

	var notifications = new Array(10).fill(null).map((i, index) => {return <Notification key={index} />})
	
	return(<DropDownTemplate
		Logo={<Icon.Notifications className="header-icon notifications"/>}
		LogoActive={<Icon.NotificationsActive className="header-icon notifications"/>}
		Content={
		<div className="notif-drop-down drop-down">
			<div className="notif-title flex">
				<span>Notifications</span>
				<Icon.Settings className="header-icon" style={{width: "1.5rem", marginRight: "1.1rem"}}/>
			</div>
			<div className="notif-content">
				{notifications}
			</div>
		</div>}
	/>)
}

export function ProfileDropDown() {
	
	const itemProps = [
		{icon: <Icon.YourChannel/>, text: "Your Channel"},
		{icon: <Icon.Purchases/>, text: "Purchases and memberships"},
		{icon: <Icon.YtStudio/>, text: "YouTube Studio"},
		{icon: <Icon.SwitchAccount/>, text: "Switch account"},
		{icon: <Icon.SignOut/>, text: "Sign out"},
		{icon: <Icon.Appearance/>, text: "Appearance: Light"},
		{icon: <Icon.Language/>, text: "Language: English"},
		{icon: <Icon.Location/>, text: "Location: USA"},
		{icon: <Icon.SettingsProfile/>, text: "Settings"},
		{icon: <Icon.YourData/>, text: "Your data in YouTube"},
		{icon: <Icon.Help/>, text: "Help"},
		{icon: <Icon.Feedback/>, text: "Send feedback"},
		{icon: <Icon.Shortcuts/>, text: "Keyboard shortcuts"}
	]
	const items = itemProps.map((item, index) => {
		
		var isNavigatable = false
		if (item.icon.type.render.name === 'SvgSwitchAccount' || item.icon.type.render.name === 'SvgLanguage' || item.icon.type.render.name === 'SvgAppearance' )
			{isNavigatable = true}
		
		return(
			<div className="profile-dd-item flex" key={index}>
				<div className="flex">
					<svg className="header-icon main-icon--dd">{item.icon}</svg>
					<p>{item.text}</p>
				</div>
				{isNavigatable ? <Icon.NavigateR className="header-icon nav-icon-dd" /> : <div/>}
			</div>
		)
	})

	return(<DropDownTemplate
		Logo={<img src={Icon.Avatar} className="header-icon avatar--header" alt="user-avatar"/>}
		LogoActive={<img src={Icon.Avatar} className="header-icon avatar--header" alt="user-avatar"/>}
		Content={
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
		</div>}
	/>)
}

export function CommentsSortByDropDown(props) {

	// SortBy Drop Down Setup
	const [isSortByDropDownShowing, setIsSortByDropDownShowing] = useState(false)
	const sortByDropDownRef = useRef(null)
	useOutsideClick(sortByDropDownRef, () => setIsSortByDropDownShowing(false))

	const {commentListType, setCommentListType} = props

	return(
	<div className='comments--icon flex' onClick={() => {setTimeout(() => {setIsSortByDropDownShowing(!isSortByDropDownShowing)}, 0)}}>
		<Icon.Sortby />
		{isSortByDropDownShowing && 
		<div ref={sortByDropDownRef} className='sort-by--drop-down drop-down'>
			<div style={commentListType === 'relevance' ? {backgroundColor: 'rgba(0, 0, 0, .2)'} : {} } 
					onClick={() => { if (commentListType !== 'relevance') { setCommentListType('relevance')}}}>
				<p >Best Reviews</p>
			</div>
			<div style={commentListType === 'time' ? {backgroundColor: 'rgba(0, 0, 0, .2)'} : {} }
					onClick={() => {if (commentListType !== 'time') { setCommentListType('time')}}}>
				<p>New First</p>
			</div>
		</div>
		}
		<span>SORT BY</span>
	</div>
	)
}
