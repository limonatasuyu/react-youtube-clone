import * as Icon from './ImportHeaderIcons'
import { Link } from 'react-router-dom'
import {useState, useRef} from 'react'
import {CreateDropDown, AppsDropDown, NotificationsDropDown, ProfileDropDown} from '../DropDowns/DropDowns'

export default function Header(props) {

	const [isSearchEmpty, setisSearchEmpty] = useState(true)
	const [searchValue, setSearchValue] = useState("")
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const searchInput = useRef(null);

	function handleSearch(event, mode) {
		if (mode === 'changeText') {
			setSearchValue(event.target.value)
			if (event.target.value.length !== 0) { setisSearchEmpty(false) }
			else {setisSearchEmpty(true)}
			return
		}
		setSearchValue("")
		setisSearchEmpty(true)
		searchInput.current.focus();
	}

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
						<input className={!isSearchEmpty ? "search-input none-empty-690" : "search-input"} placeholder="Search" onChange={(event) => {handleSearch(event, 'changeText')}} value={searchValue} ref={searchInput}/>
						<div className="clear-search-wrapper">
							<Icon.ClearSearch onClick={(event) => {handleSearch(event, 'clearText')}} className={!isSearchEmpty ? "header-icon clear-search-icon" : "display-none"}/>
						</div>
					</div>
					<button className="search-button"><Icon.Search className="header-icon" /></button>
				</form>
				<Icon.Search className="header-icon display-none search-button-656" onClick={() => {setIsSearchOpen(true); searchInput.current.focus();}}/>
				<Icon.Mic className="header-icon mic-icon" />
			</div>
			<div className="third-header-container flex">
				<CreateDropDown />
				<AppsDropDown />
				<NotificationsDropDown />
				<ProfileDropDown />
			</div>
		</div>
	)
}
