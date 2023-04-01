import { sub } from "date-fns";

const _mock = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  time: (index) => sub(new Date(), { days: index, hours: index }),
  image: {
    cover: (index) =>
      `https://minimal-assets-api.vercel.app/assets/images/covers/cover_${
        index + 1
      }.jpg`,
    feed: (index) =>
      `https://minimal-assets-api.vercel.app/assets/images/feeds/feed_${
        index + 1
      }.jpg`,
    product: (index) =>
      `https://minimal-assets-api.vercel.app/assets/images/products/product_${
        index + 1
      }.jpg`,
    avatar: (index) =>
      `https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_${
        index + 1
      }.jpg`,
  },
};

export const _notifications = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: [
    "Your order is placed",
    "Sylvan King",
    "You have new message",
    "You have new mail",
    "Delivery processing",
  ][index],
  description: [
    "waiting for shipping",
    "answered to your comment on the Minimal",
    "5 unread messages",
    "sent from Guido Padberg",
    "Your order is being shipped",
  ][index],
  avatar: [null, _mock.image.avatar(2), null, null, null][index],
  type: [
    "order_placed",
    "friend_interactive",
    "chat_message",
    "mail",
    "order_shipped",
  ][index],
  createdAt: _mock.time(index),
  isUnRead: [true, true, false, false, false][index],
}));
