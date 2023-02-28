import { Menu as MuiMenu } from "@mui/material";
export { MenuItem, ListItemIcon, Divider } from "@mui/material";

export default function Menu({
	anchorEl,
	onClose = () => {},
	children = [<></>],
}) {
	return (
		<MuiMenu
			anchorEl={anchorEl}
			id="account-menu"
			open={!!anchorEl}
			onClose={onClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: "visible",
					filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
					minWidth: 220,
					mt: 1.5,

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
