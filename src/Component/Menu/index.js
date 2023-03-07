import { useEffect } from "react";
import { Menu as MuiMenu } from "@mui/material";
import { useLocation } from "react-router-dom";

import depthEffect from "../../Theme/sx/depth-effect";

export { MenuItem, ListItemIcon, Divider } from "@mui/material";

export default function Menu({
	anchorEl,
	onClose = () => {},
	children = [<></>],
}) {
	const location = useLocation();
	useEffect(() => {
		if (anchorEl) onClose();
	}, [location]);
	return (
		<MuiMenu
			anchorEl={anchorEl}
			open={!!anchorEl}
			onClose={onClose}
			PaperProps={{
				elevation: 0,

				sx: {
					borderRadius: "2%",
					overflow: "visible",
					filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
					minWidth: 220,
					mt: 1.5,
					...depthEffect(),

					"& .MuiAvatar-root": {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					"&:before": {
						content: '""',
						display: "block",
						position: "absolute",
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: "background.paper",
						transform: "translateY(-50%) rotate(45deg)",
						zIndex: 0,
					},
				},
			}}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
		>
			<div>{children}</div>
		</MuiMenu>
	);
}
