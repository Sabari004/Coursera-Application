import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "/",
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/user/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/login",
  },
];
