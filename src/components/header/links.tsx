import Link from "next/link";
import type { MouseEventHandler } from "react";

import { Box, Text } from "@chakra-ui/react";

const links = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

interface Props {
  onClick: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const Links = ({ onClick }: Props) => {
  const handleClickScroll = (link: any) => {
    if (window.location.pathname != "/") window.location.href = "/";
    const element = document.getElementById(link);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {links.map((link) => (
        <Box
          as="li"
          listStyleType="none"
          px={{ lg: "8" }}
          py={{ base: "3" }}
          key={link.title}
        >
          <Link href={link.path} onClick={onClick}>
            <Text>{link.title}</Text>
          </Link>
        </Box>
      ))}
    </>
  );
};

export default Links;
