import * as Icon from './ImportNavbarImages'
import {Link} from 'react-router-dom'
import {useState} from 'react'

//<Icon.HomeActive className="navbar-icon"/>
function NavbarItem(props) {

	return(
		<Link className={props.isActive ? "navbar-item active--navbar-item flex" : "navbar-item flex"} to={props.to} style={{textDecoration: "none", color: "black"}}>
			{props.icon}
			<p>{props.text}</p>
		</Link>
	)
}

function NavbarItemSub() {
	return(
		<div className="navbar-item flex">
			<img className="navbar-sub-img" src={Icon.Avatar} />
			<p>Some Channel</p>
		</div>
	)
}

export default function Navbar() {

	const [isShowinMore, setIsShowinMore] = useState(false)
	const [isShowinMoreSubs, setIsShowinMoreSubs] = useState(false)


	return(
		<div className="navbar--container">
			<div className="navbar-items">
				<NavbarItem icon={<Icon.HomeActive className="navbar-icon"/>} text="Home" to="/" isActive={true}/>
				<NavbarItem icon={<Icon.Explore className="navbar-icon"/>} text="Explore" to="/explore" isActive={false}/>
				<NavbarItem icon={<Icon.Shorts className="navbar-icon"/>} text="Shorts" to="/shorts" isActive={false}/>
				<NavbarItem icon={<Icon.Subs className="navbar-icon"/>} text="Subscriptions" to="/subscriptions" isActive={false}/>
			</div>
			<div className="navbar-items">
				<NavbarItem icon={<Icon.Library className="navbar-icon"/>} text="Library" to="/library" isActive={false}/>
				<NavbarItem icon={<Icon.History className="navbar-icon"/>} text="History" to="/history" isActive={false}/>
				<NavbarItem icon={<Icon.YourVideos className="navbar-icon"/>} text="Your videos" to="/idk" isActive={false}/>
				<NavbarItem icon={<Icon.WatchLater className="navbar-icon"/>} text="Watch later" to="/idk" isActive={false}/>
				<NavbarItem icon={<Icon.Likes className="navbar-icon"/>} text="Liked videos" to="/idk" isActive={false}/>
				{!isShowinMore ?
				<div className="navbar-item flex" onClick={() => setIsShowinMore(true)}>
					<Icon.Navigate className="navbar-icon"/>
					<p>Show more</p>
				</div>
				:
				<>
				<NavbarItem icon={<Icon.List className="navbar-icon"/>} text="Some Playlist" to="/idk" isActive={false}/>
				<div className="navbar-item flex" onClick={() => setIsShowinMore(false)}>
					<Icon.Navigate className="navbar-icon" style={{transform: "rotate(180deg)"}}/>
					<p>Show less</p>
				</div>
				</>
				}
			</div>
			<div className="navbar-items">
				<p className="navbar-title">SUBSCRIPTIONS</p>
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				{!isShowinMoreSubs ?
				<div className="navbar-item flex" onClick={() => setIsShowinMoreSubs(true)}>
					<Icon.Navigate className="navbar-icon"/>
					<p>Show more</p>
				</div>
				:
				<>
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				<NavbarItemSub />
				<div className="navbar-item flex" onClick={() => setIsShowinMoreSubs(false)}>
					<Icon.Navigate  style={{transform: "rotate(180deg)"}} className="navbar-icon"/>
					<p>Show less</p>
				</div>
				</>
				}
			</div>
			<div className="navbar-items">
				<p className="navbar-title">MORE FROM YOUTUBE</p>
				<NavbarItem icon={<Icon.Premium className="navbar-icon"/>} text="YouTube Premium" to="/idk" isActive={false}/>
				<NavbarItem icon={<Icon.Game className="navbar-icon"/>} text="Gaming" to="/idk" isActive={false}/>
				<NavbarItem icon={<Icon.Live className="navbar-icon"/>} text="Live" to="/idk" isActive={false}/>
				<NavbarItem icon={<Icon.Sports className="navbar-icon"/>} text="Sports" to="/idk" isActive={false}/>
			</div>
			<div className="navbar-items">
				<NavbarItem icon={<Icon.Settings className="navbar-icon"/>} text="Settings" to="/idk" isActive={false}/>
				<NavbarItem icon={<Icon.ReportHistory className="navbar-icon"/>} text="Report history" to="/idk" isActive={false}/>
				<NavbarItem icon={<Icon.Help className="navbar-icon"/>} text="Help" to="/idk" isActive={false}/>
				<NavbarItem icon={<Icon.Feedback className="navbar-icon"/>} text="Send feedback" to="/idk" isActive={false}/>
			</div>
			<div className="navbar-info grid" style={{gridGap: "1rem"}}>
				<div>
					<div>
						<a href="/">About</a>
						<a href="/">Press</a>
						<a href="/">Copyright</a>
					</div>
					<div>
						<a href="/">Contact us</a>
						<a href="/">Creators</a>
					</div>
					<div>
						<a href="/">Advertise</a>
						<a href="/">Developers</a>
					</div>
				</div>
				<div>
					<div>
						<a href="/">Terms</a>
						<a href="/">Privacy</a>
						<a href="/">Policy & Safety</a>
					</div>
					<div>
						<a href="/">How Youtube Works</a>
					</div>
					<div>
						<a href="/">Test new features</a>
					</div>
				</div>
				<p style={{fontSize: ".8rem", fontFamily: "Roboto", color: "#909090"}}>© 2022 Google LLC</p>
			</div>
		</div>
	)
}
