import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.title}>Task Manager</div>
      <div className={classes.navlinks}>
        <div>
          <NavLink
            to="/"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "red" : "black",
              };
            }}
          >
            All Tasks
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/create"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "red" : "black",
              };
            }}
          >
            Create
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
