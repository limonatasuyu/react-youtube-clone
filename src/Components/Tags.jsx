import {ReactComponent as NavigateIcon} from '../img/OtherIcons/tags-navigate.svg'
import {motion, useAnimation} from 'framer-motion'
import {useState, useRef} from 'react'
import {useOnScreen} from '../CustomHooks'

function Tag(props) {
	return(
		<div className="single-tag">
			<span>{props.children}</span>
		</div>
	)
}

export function TagsHome(props) {

	const tagProps = ["All", "New to you", "Music", "Gaming", "Mixes", "Python", "Linux", "Web Development", "Memes", "AI" , "History", "Algorithms", "Some Tag", "Some Tag", "Some Tag", "Some Tag", "Some Tag"]
	
	const tags = tagProps.map((item, index) => {
		return(
			<Tag key={index}>{item}</Tag>
		)
	})

	const [tagsPos, setTagsPos] = useState(0)
	const [tagsDirection, setTagsDirection] = useState(null)
	const controlTags = useAnimation()
	function animateTags(side) {
		let newPos = tagsPos
		if (side === "toRight") {newPos += 200; setTagsDirection("toRight")}
		else {newPos -= 200;  setTagsDirection("toLeft")}
		controlTags.start({x: newPos, transition: {type: "tween"}})
		setTagsPos(newPos)
	}
	
	const leftObserver = useRef(null)
	const rightObserver = useRef(null)
	const isLeftObserverVis = useOnScreen(leftObserver)
	const isRightObserverVis = useOnScreen(rightObserver)
	if (tagsDirection === "toRight" && isLeftObserverVis) {controlTags.stop()}
	if (tagsDirection === "toLeft" && isRightObserverVis) {controlTags.stop()}

	return(
		<div  className={props.isMenuViewChanged ? "home-tags--container home-tags--container-big" : "home-tags--container"} style={{overflow: "hidden"}}>
			<div className="home-tags--wrapper flex">
				<div className={isLeftObserverVis ? "display-none" : "tags-nav--wrapper tags-nav--wrapper-left flex"} style={{zIndex: 2}}>
					<div className="tag-nav-icon--wrapper flex">
						<NavigateIcon className="tags-nav tags-nav-left" style={{transform: "rotate(180deg)"}} onClick={() => animateTags("toRight")}/>
					</div>
					<div className="tags-nav-blank tags-nav-blank-transparent" />
					<div className="tags-nav-blank tags-nav-blank" />
				</div>
				<motion.div
					className="home-tags--wrapper home-tags-only flex"
					animate={controlTags}
				>
					<div ref={leftObserver}/>
					{tags}
					<div ref={rightObserver}/>
				</motion.div>
				<div className={isRightObserverVis ? "display-none" : "tags-nav--wrapper tags-nav--wrapper-right flex"}>
					<div className="tags-nav-blank tags-nav-blank" />
					<div className="tags-nav-blank tags-nav-blank-transparent" />
					<div className="tag-nav-icon--wrapper flex">
						<NavigateIcon className="tags-nav tags-nav-right" onClick={() => animateTags("toLeft")}/>
					</div>
				</div>
			</div>
		</div>
	)
}
