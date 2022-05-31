import HomePage from './Pages/HomePage'
import ExplorePage from './Pages/ExplorePage'
import { Routes, Route } from 'react-router-dom'

export default function App() {
	return(
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/explore" element={<ExplorePage />} />
	</Routes>
	)
}
