import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { LinkProps } from "react-router-dom";
import { ReactNode } from "react";

interface Props extends LinkProps {
   to: string;
   children: ReactNode;
}

export default function CustomLink({ to, children, ...props }: Props) {
   const resolvedPath = useResolvedPath(to);
   const isActive = useMatch({ path: resolvedPath.pathname, end: true });
   return (
      <div className={isActive ? "hide-link-button" : "link-button"}>
         <Link to={to} {...props}>
            {children}
         </Link>
      </div>
   );
}
