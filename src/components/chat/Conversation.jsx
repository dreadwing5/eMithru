import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const Conversation = ({ conversation }) => {
  return (
    <ListItem sx={{ py: 1, px: 2 }}>
      <ListItemAvatar>
        <Avatar
          alt="User Avatar"
          src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        />
      </ListItemAvatar>
      <ListItemText primary={conversation._id} />
    </ListItem>
  );
};

export default Conversation;
