import HomePage from './Pages/HomePage'
import ExplorePage from './Pages/ExplorePage'
import WatchPage from './Pages/WatchPage'
import { Routes, Route } from 'react-router-dom'

export default function App() {
	return(
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/explore" element={<ExplorePage />}/>
		<Route path="/watch/:videoId" element={<WatchPage />} />
		<Route path="*" element={<h1 style={{marginLeft: '10px'}}>404 not found</h1>} />
	</Routes>
	)
}
