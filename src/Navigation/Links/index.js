import HomeIcon from "@mui/icons-material/Home";
import AboutIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactIcon from "@mui/icons-material/ContactMail";
export const LinkSection = [
	{
		name: "Basic",
		links: [
			{ to: "/", text: "Home", Icon: HomeIcon },
			{ to: "/about", text: "About", Icon: AboutIcon },
			{ to: "/contact", text: "Contact", Icon: ContactIcon },
			{
				to: "/settings",
				text: "Settings",
				Icon: SettingsIcon,
			},
		],
	},
	{
		name: "Advanced",
		links: [
			{ to: "/", text: "Home", Icon: HomeIcon },
			{ to: "/about", text: "About", Icon: AboutIcon },
		],
	},
	{
		name: "More Advanced",
		links: [
			{ to: "/", text: "Home", Icon: HomeIcon },
			{ to: "/about", text: "About", Icon: AboutIcon },
		],
	},
	{
		name: "Slightly More Advanced",
		links: [
			{ to: "/", text: "Home", Icon: HomeIcon },
			{ to: "/about", text: "About", Icon: AboutIcon },
		],
	},
];
