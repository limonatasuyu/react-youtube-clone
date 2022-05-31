import { useEffect } from 'react'

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


export {useOutsideClick}
