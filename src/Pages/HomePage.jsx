import Header from '../Components/Header/Header'
import {Navbar} from '../Components/Navbar/Navbar'
import {NavbarSlide} from '../Components/Navbar/NavbarSlide'
import {useState, useEffect} from 'react'
import {motion, useAnimation} from 'framer-motion'
import {TagsHome} from '../Components/Tags'
import {VideosHome} from '../Components/Videos/Videos'
import {videoMetaData} from '../Components/Videos/ImportData'
import {getRandomObjects} from '../Helpers/HelperFunctions'

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
	
	
	// Creating a state for categories in order to arranging the thumbnails and tags orientation 
	const [categories, setCategories] = useState(null);
	
	// Categories needs to be setted once so i'm using useEffect hook
	useEffect(() => {
		// getRandomObjects is a function for getting random n objects from an object (for more: ../../Helpers/HelperFunctions.js)
		setCategories(getRandomObjects(10, videoMetaData))
	}, [])
	
	
	const [currentCategory, setCurrentCategory] = useState("All")

	return(
		<div className="homepage-container">
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
					{	/* if the categories is not setted yet don't mount the videos and categories */ categories &&
					<>
					<TagsHome categories={categories} setCurrentCategory={setCurrentCategory} currentCategory={currentCategory}/>
					<VideosHome isMenuViewChanged={isMenuViewChanged} categories={categories} currentCategory={currentCategory}/>
					</>
					}
				</div>
			</div>
		</div>
	)
}
