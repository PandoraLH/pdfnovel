import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { signOut } from "next-auth/react";

export default function ProfileMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <LocalLibraryOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Library</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <VpnKeyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change password</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ManageAccountsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
