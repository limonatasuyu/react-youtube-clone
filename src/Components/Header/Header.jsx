import * as Icon from './ImportHeaderIcons'
import { Link } from 'react-router-dom'
import { useState, useRef} from 'react'
import {useOutsideClick} from '../../Helpers/CustomHooks'
import {CreateDropDown, AppsDropDown, NotificationsDropDown, ProfileDropDown} from './DropDowns'

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
