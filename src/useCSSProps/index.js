import { useLayoutEffect } from "react";
export default function useCSSProps() {
	useLayoutEffect(() => {
		const setCSSProps = () => {
			/* --app-height fixes IOS window height bug (url bar covers part of page unless --app-height is set dynamically) */
			const appHeight = window.innerHeight;
			document.documentElement.style.setProperty(
				"--app-height",
				`${appHeight}px`
			);
			/* navigation element is in file: src/Navigation/index.js */
			const navHeight =
				document.getElementById("navigation").getBoundingClientRect()
					.height + "px";
			document.documentElement.style.setProperty(
				"--nav-height",
				navHeight
			);

			const bodyHeight = `calc(var(--app-height) - var(--nav-height))`;
			document.documentElement.style.setProperty(
				"--body-height",
				bodyHeight
			);

			const footerMinHeight = `15vh`;
			document.documentElement.style.setProperty(
				"--footer-min-height",

				footerMinHeight
			);
		};
		window.addEventListener("resize", setCSSProps);
		setCSSProps();

		return () => {
			window.removeEventListener("resize", setCSSProps);
		};
	}, []);
}
