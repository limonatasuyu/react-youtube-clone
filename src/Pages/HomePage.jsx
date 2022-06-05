import Header from '../Components/Header'
import {Navbar} from '../Components/Navbar'
import {NavbarSlide} from '../Components/NavbarSlide'
import {useState, useEffect} from 'react'
import {motion, useAnimation} from 'framer-motion'
import {TagsHome} from '../Components/Tags'
import {VideosHome} from '../Components/Videos'

export default function HomePage() {

	const [isMenuViewChanged, setMenuView] = useState(false) 
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	useEffect(() => {
		window.addEventListener('resize', () => {setWindowWidth(window.innerWidth)})
	}, [])
	
	const control = useAnimation()
	
	var vars = {
		visible: {x: -73, transition: {duration: .25}},
		unVisible: {x: -311	, transition: {duration: .25}},
	}
	
	const handleMenu = () => {
		setMenuView(!isMenuViewChanged)
		if (windowWidth > 1330) {return}
		if (isMenuViewChanged) {control.start("unVisible")}
		else {control.start("visible")}

	}
	if (windowWidth > 1330) {control.start("unVisible")}

	return(
		<div className="homepage-container" >
			<Header handleMenu={handleMenu}/>
			<div className="flex">
				<Navbar
					isMenuViewChanged={isMenuViewChanged}
					handleMenu={handleMenu}
				/>
				<motion.div
					style={{zIndex: "3"}}
					initial={'unVisible'}
					animate={control}
					variants={vars}
					drag="x"
					dragMomentum={false}
					dragConstraints={{right: -73}}
					dragElastic={0}
					onDragEnd={(e, i)=> {if (i.point.x > 80) {control.start("visible")} else {control.start("unVisible"); setMenuView(!isMenuViewChanged)}}}
					>
				<NavbarSlide handleMenu={handleMenu} />
				</motion.div>
				<div className={isMenuViewChanged ? "home-page-content home-page-content-big" : "home-page-content"}>
					<TagsHome />
					<VideosHome isMenuViewChanged={isMenuViewChanged}/>
				</div>
			</div>
		</div>
	)
}
