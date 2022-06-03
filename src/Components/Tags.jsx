import {ReactComponent as NavigateIcon} from '../img/OtherIcons/tags-navigate.svg'


function Tag(props) {
	return(
		<div className="single-tag">
			<span>{props.children}</span>
		</div>
	)
}

export function TagsHome() {

	const tagProps = ["All", "New to you", "Music", "Gaming", "Mixes", "Python", "Linux", "Web Development", "Memes", "AI" , "History", "Algorithms", "Some Tag", "Some Tag", "Some Tag", "Some Tag", "Some Tag"]
	
	const tags = tagProps.map((item, index) => {
		return(
			<Tag key={index}>{item}</Tag>
		)
	})

	return(
		<div  className="home-tags--container" style={{overflow: "hidden"}}>
			<div className="home-tags--wrapper flex">
				<div className="tags-nav--wrapper tags-nav--wrapper-left flex" style={{zIndex: "2"}}>
					<NavigateIcon className="tags-nav tags-nav-left" style={{transform: "rotate(180deg)"}}/>
					<div className="tags-nav-blank tags-nav-blank-1" />
					<div className="tags-nav-blank tags-nav-blank-2" />
				</div>
				<div className="home-tags--wrapper home-tags-only flex">
					{tags}
				</div>
				<div className="tags-nav--wrapper tags-nav--wrapper-right">
					<div className="tags-nav-blank tags-nav-blank-1" />
					<div className="tags-nav-blank tags-nav-blank-2" />
					<NavigateIcon className="tags-nav tags-nav-right"/>
				</div>
			</div>
		</div>
	)
}
