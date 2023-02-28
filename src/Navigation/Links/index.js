import HomeIcon from "@mui/icons-material/Home";
import AboutIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactIcon from "@mui/icons-material/ContactMail";
import PrivacyTip from "@mui/icons-material/PrivacyTip";
import TermsOfServiceIcon from "@mui/icons-material/Description";
import ReactIconSrc from "./Icon/discord.svg";
export const LinkSection = [
	{
		name: "Navigation",
		showInTopNav: true,
		links: [
			{ to: "/", text: "Home", Icon: HomeIcon },
			{
				to: "/settings",
				text: "Settings",
				Icon: SettingsIcon,
			},
		],
	},
	{
		name: "Company",
		links: [
			{ to: "/about", text: "About", Icon: AboutIcon },
			{ to: "/contact", text: "Contact", Icon: ContactIcon },
		],
	},
	{
		name: "Legal",

		links: [
			{
				to: "/privacy",
				text: "Privacy Policy",
				Icon: PrivacyTip,
			},
			{
				to: "/terms",
				text: "Terms of Service",
				Icon: TermsOfServiceIcon,
			},
		],
	},
	{
		name: "Social",
		links: [
			{
				to: "https://twitter.com/bangobotto",
				text: "Twitter",
				Icon: () => {
					return (
						<img
							style={{
								width: "24px",
								height: "24px",
							}}
							src="https://abs.twimg.com/favicons/twitter.ico"
							alt="Twitter"
						/>
					);
				},
			},
			{
				to: "https://disboard.org/server/752949221371543554",
				text: "Discord",
				Icon: () => {
					return (
						<img
							style={{
								width: "24px",
								height: "24px",
							}}
							src={ReactIconSrc}
							alt="Discord"
						/>
					);
				},
			},
			{
				to: "https://reddit.com/u/bingobangowebdev",
				text: "Reddit",

				Icon: () => {
					return (
						<img
							style={{
								width: "24px",
								height: "24px",
							}}
							src="https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png"
							alt="Reddit"
						/>
					);
				},
			},
		],
	},
];
