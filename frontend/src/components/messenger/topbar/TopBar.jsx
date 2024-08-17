import "./topbar.css";
import { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { FaPerson } from "react-icons/fa6";
import { RiChat4Fill } from "react-icons/ri";
import { BiNotificationOff } from "react-icons/bi";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <FiSearch className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <FaPerson />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <RiChat4Fill />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <BiNotificationOff />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link href={`/profile/${user?.userName}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
