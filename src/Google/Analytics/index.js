import ReactGA from "react-ga4";

export default function useAnalytics() {
	return {
		// On click of a button
		button_click: ({ label }) => {
			return ReactGA.event({
				category: "user_engagement",
				action: "Button Click",
				label,
			});
		},
		// On click of a link
		link_click: ({ label }) => {
			return ReactGA.event({
				category: "user_engagement",
				action: "Link Click",
				label,
			});
		},
		form_submit: ({ label }) => {
			return ReactGA.event({
				category: "user_engagement",
				action: "Form Submit",
				label,
			});
		},
	};
}
