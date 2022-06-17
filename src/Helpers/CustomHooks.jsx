import { useState, useEffect } from 'react'

//Source code for this function: https://www.geeksforgeeks.org/how-to-detect-click-outside-react-component/
function useOutsideClick(ref, callback) {
	useEffect(() => {
	// Function for click event
	function handleOutsideClick(event) {
		if (ref.current && !ref.current.contains(event.target)) {callback()}
	}
		// Adding click event listener
		document.addEventListener("click", handleOutsideClick);
		return () => document.removeEventListener("click", handleOutsideClick);
	}, [ref]);
}


// Source for Custom useOnScreen Hook: https://designcode.io/react-hooks-handbook-useonscreen-hook
const useOnScreen = (ref, rootMargin = '0px') => {

	const [isVisible, setIsVisible] = useState(false)
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting)
			}, { rootMargin }
		);

	const currentElement = ref?.current;
	
	if(currentElement) {
		observer.observe(currentElement)
	}
	
	return () => {
		observer.unobserve(currentElement);
	}}, [])
	
	return isVisible
}

export {useOutsideClick, useOnScreen}
