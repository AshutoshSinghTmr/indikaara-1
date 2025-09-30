import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function SideNav({ isOpen, setIsOpen, toggleDrawer }) {
  const handleClose = () => setIsOpen(false);
  const DrawerList = (
    <Box
      sx={{ width: 260 }}
      role="presentation"
      className="bg-[#111] h-full text-white"
    >
      <List>
        {[
          "Home",
          "Catalogue",
          "Our Businesses",
          "Our Foundation",
          "Artisans",
          "Blog",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleClose}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Profile", "Cart", "Whishlist"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleClose}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* Drawer anchored explicitly to the left */}
      <Drawer anchor="left" open={isOpen} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
