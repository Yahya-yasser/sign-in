import TopBar from "./Components/TopBar";
import SideBar from "./Components/SideBar";
import Users from "./Users";
import { Outlet } from "react-router-dom";
 
export default function Dashboard() {
  return (
      <div>
          <TopBar/>
          <br/>
          <br/>
          <SideBar/>
          <br/>
          <br/>
          <Outlet/>
      </div>
  );
}