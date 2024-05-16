// hooks
// import useAuth from '../hooks/useAuth';
// utils
import createAvatar from "../utils/createAvatar";
//
import Avatar from "./Avatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ user }) {
  const { name, color } = createAvatar(user?.name);

  return (
    <Avatar alt={user?.name} color={color}>
      {name}
    </Avatar>
  );
}
