import * as Icon from './ImportNavbarImages'
import {Link} from 'react-router-dom'
import {useState} from 'react'

export function NavbarItem(props) {
	return(
		<Link className={props.isActive ? "navbar-item active--navbar-item flex" : "navbar-item flex"} to={props.to} style={{textDecoration: "none", color: "black"}}>
			{props.icon}
			<p>{props.text}</p>
		</Link>
	)
}

export function NavbarItemSub() {
	return(
		<Link className="navbar-item flex" to="/idk" style={{textDecoration: "none", color: "black"}}>
			<img className="navbar-sub-img" src={Icon.Avatar} alt="subbed-channel-pp" />
			<p>Some Channel</p>
		</Link>
	)
}

function NavbarTemplate() {

	const [isShowinMore, setIsShowinMore] = useState(false)
	const [isShowinMoreSubs, setIsShowinMoreSubs] = useState(false)
	
	return(
	<>
	<div className="navbar-items navbar-items-primary">
				<NavbarItem icon={<Icon.HomeActive className="navbar-icon"/>} text="Home" to="/" isActive={true}/>
				<NavbarItem icon={<Icon.Explore className="navbar-icon"/>} text="Explore" to="/explore"/>
				<NavbarItem icon={<Icon.Shorts className="navbar-icon"/>} text="Shorts" to="/shorts"/>
				<NavbarItem icon={<Icon.Subs className="navbar-icon"/>} text="Subscriptions" to="/subscriptions" />
				<NavbarItem icon={<Icon.Library className="navbar-icon"/>} text="Library" to="/library" />
			</div>
			<div className="navbar-items">
				<NavbarItem icon={<Icon.Library className="navbar-icon"/>} text="Library" to="/library" />
				<NavbarItem icon={<Icon.History className="navbar-icon"/>} text="History" to="/history" />
				<NavbarItem icon={<Icon.YourVideos className="navbar-icon"/>} text="Your videos" to="/idk" />
				<NavbarItem icon={<Icon.WatchLater className="navbar-icon"/>} text="Watch later" to="/idk" />
				<NavbarItem icon={<Icon.Likes className="navbar-icon"/>} text="Liked videos" to="/idk" />
				{!isShowinMore ?
				<div className="navbar-item flex" onClick={() => setIsShowinMore(true)}>
					<Icon.Navigate className="navbar-icon"/>
					<p>Show more</p>
				</div>
				:
				<>
				<NavbarItem icon={<Icon.List className="navbar-icon"/>} text="Some Playlist" to="/idk"/>
				<div className="navbar-item flex" onClick={() => setIsShowinMore(false)}>
					<Icon.Navigate className="navbar-icon" style={{transform: "rotate(180deg)"}}/>
					<p>Show less</p>
				</div>
				</>
				}
			</div>
			<div className="navbar-items">
				<p className="navbar-title">SUBSCRIPTIONS</p>
				{new Array(7).fill(null).map((item, index) => {return <NavbarItemSub key={index} />})}
				{!isShowinMoreSubs ?
				<div className="navbar-item flex" onClick={() => setIsShowinMoreSubs(true)}>
					<Icon.Navigate className="navbar-icon"/>
					<p>Show more</p>
				</div>
				:
				<>
				{new Array(7).fill(null).map((item, index) => {return <NavbarItemSub key={index} />})}
				<div className="navbar-item flex" onClick={() => setIsShowinMoreSubs(false)}>
					<Icon.Navigate  style={{transform: "rotate(180deg)"}} className="navbar-icon"/>
					<p>Show less</p>
				</div>
				</>
				}
			</div>
			<div className="navbar-items">
				<p className="navbar-title">MORE FROM YOUTUBE</p>
				<NavbarItem icon={<Icon.Premium className="navbar-icon"/>} text="YouTube Premium" to="/idk" />
				<NavbarItem icon={<Icon.Game className="navbar-icon"/>} text="Gaming" to="/idk" />
				<NavbarItem icon={<Icon.Live className="navbar-icon"/>} text="Live" to="/idk" />
				<NavbarItem icon={<Icon.Sports className="navbar-icon"/>} text="Sports" to="/idk" />
			</div>
			<div className="navbar-items">
				<NavbarItem icon={<Icon.Settings className="navbar-icon"/>} text="Settings" to="/idk" />
				<NavbarItem icon={<Icon.ReportHistory className="navbar-icon"/>} text="Report history" to="/idk" />
				<NavbarItem icon={<Icon.Help className="navbar-icon"/>} text="Help" to="/idk" />
				<NavbarItem icon={<Icon.Feedback className="navbar-icon"/>} text="Send feedback" to="/idk" />
			</div>
			<div className="navbar-info grid" style={{gridGap: "1rem"}}>
				{[ /*It's just bunch of "a" tags inside "div" tags with no classes or attributes. There is a 17 line gain in coding like that instead of simply coding the html*/
					[
						['About', 'press', 'Copyright'].map((item, index) => {return <a href='/' key={index}>{item}</a>}),
						['Contact us', 'Creators'].map((item, index) => {return <a href='/' key={index}>{item}</a>}),
						['Advertise', 'Developers'].map((item, index) => {return <a href='/' key={index}>{item}</a>})
					].map((item, index) => {return <div key={index}>{item}</div>}),
					[
						['Terms', 'Privacy', 'Policy & Safety'].map((item, index) => {return <a href='/' key={index}>{item}</a>}),
						<a href="/">How Youtube Works</a>, <a href="/">Test new features</a>
					].map((item, index) => {return <div key={index}>{item}</div>})
				].map((item, index) => {return <div key={index}>{item}</div>})}
				<p style={{fontSize: ".8rem", fontFamily: "Roboto", color: "#909090"}}>© 2022 Google LLC</p>
			</div>
		</>
	)
}

export function Navbar(props) {

	var containerClasses;
	
  if (props.isMenuViewChanged) {containerClasses = "navbar--container navbar-small"}
	else {containerClasses = "navbar--container navbar--container--set-screen"}
	
	return(
		<div className={containerClasses}>
			<NavbarTemplate />
		</div>
	)
}

export function NavbarSlide(props) {

	return(
		<div className="slide-navbar--container" style={props.style}>
			<div className="logo-n-menu--navbar">
					<Icon.Menu className="header-icon menu-icon" onClick={props.handleMenu}/>
					<Link to="/"><Icon.Logo className="header-icon logo" /></Link>
				</div>
			<div className="navbar--container">
				<NavbarTemplate />
			</div>
		</div>
	)
}
