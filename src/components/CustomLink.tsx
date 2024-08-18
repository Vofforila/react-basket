import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { LinkProps } from "react-router-dom";
import { ReactNode } from "react";
import { useUser } from "../contexts/UserContext";

interface Props extends LinkProps {
   to: string;
   children: ReactNode;
}

export default function CustomLink({ to, children, ...props }: Props) {
   const { user } = useUser();
   const resolvedPath = useResolvedPath(to);
   const isActive = useMatch({ path: resolvedPath.pathname, end: true });
   return (
      <div
         className={
            isActive ||
            (user?.email === undefined &&
               (children == "Basket" ||
                  children === "Market" ||
                  children === "Sign Out")) ||
            (user?.email !== undefined &&
               (children === "Login" || children === "Register"))
               ? "hide-link-button"
               : "link-button"
         }
      >
         <Link to={to} {...props}>
            {user?.username !== undefined && children === "Sign Out"
               ? "Sign Out " + user?.username
               : children}
         </Link>
      </div>
   );
}
