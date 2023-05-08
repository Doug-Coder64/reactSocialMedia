import React from "react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href: string;
  nameLabel: string;
}
const NavButton: React.FC<Props> = (props: Props) => {
  const [width, setWidth] = React.useState(1025);
  const breakpoint = 1024;

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <Link className='nav-button' href={props.href}>
      <div>
        {props.children}
        {width > breakpoint ? (
          <span className='px-2'>{props.nameLabel}</span>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
};

export default NavButton;
