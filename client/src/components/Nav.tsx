import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import { Link } from "react-router-dom";

type NavLinkProps = {
  name: string;
  linkTo: string;
};

function Nav() {
  return (
    <div className="m-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavLink name="Home" linkTo="/" />
          <NavLink name="My Cards" linkTo="/collection" />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function NavLink({ name, linkTo }: NavLinkProps) {
  return (
    <NavigationMenuItem>
      <Link to={linkTo}>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {name}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

export default Nav;
