import React, { ReactNode, useEffect, useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import {
  FiHome,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiMail,
} from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { IconType } from "react-icons";
import { ReactText } from "react";
import "@fontsource/open-sans";
import Link from "next/link";
import axios from "axios";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface LinkItemProp {
  name: string;
}

const FirstLink: Array<LinkItemProps> = [{ name: "Dashboard", icon: FiHome }];

const FourthLink: Array<LinkItemProps> = [{ name: "Mail", icon: FiMail }];

const FifthLink: Array<LinkItemProps> = [
  { name: "Classes", icon: SiGoogleclassroom },
];

const SixthLink: Array<LinkItemProp> = [{ name: "Name" }];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        backgroundColor={"#333333"}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 40 }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [teacherData, setTeacherData] = useState<
    Array<{
      department: string;
      position: string;
      teacher_name: string;
    }>
  >([]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      const result = await axios.get(
        "http://127.0.0.1:5000/api/v1/teacher-info",
        {
          withCredentials: true,
        }
      );
      setTeacherData(result.data);
    };

    fetchTeacherData();
  }, []);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#333333", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 40 }} //TASKBAR WIDTH
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between">
        <Image //LOGO HERE
          src={"/logo.png"}
          alt={""}
          width={50}
          height={50}
          marginLeft={1}
        ></Image>

        <CloseButton
          mr={1.5}
          color={"white"}
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>

      <Box marginLeft={-4}>
        <Link //LINK FOR FIRST BUTTON
          href="/afterLogin/home"
          style={{ textDecoration: "none" }}
        >
          {FirstLink.map((link) => (
            <NavItem textColor={"white"} key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </Link>

        <Link
            href="https://outlook.office.com/mail/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
        >
          {FourthLink.map((link) => (
            <NavItem textColor={"white"} key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </Link>

        <Link //LINK FOR FIFTH BUTTON
          href="/afterLogin/classes"
          style={{ textDecoration: "none" }}
        >
          {FifthLink.map((link) => (
            <NavItem textColor={"white"} key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </Link>
      </Box>

      <Popover>
        <PopoverTrigger>
          <Box position="absolute" bottom="0">
            <Flex
              h="auto"
              alignItems="center"
              justifyContent="space-between"
              padding={3}
              paddingBottom={5}
            >
              <HStack>
                <Image //Logout
                  src={"/user.png"}
                  alt={""}
                  width={50}
                  height={50}
                  marginLeft={1}
                />
                {teacherData.map((item) => (
                  <Text textAlign="left" fontSize="15px" color={"white"}>
                    {item.teacher_name}
                  </Text>
                ))}
                <CloseButton
                  mr={1.5}
                  color={"white"}
                  display={{ base: "flex", md: "none" }}
                  onClick={onClose}
                />
              </HStack>
            </Flex>
          </Box>
        </PopoverTrigger>
        <PopoverContent w="100%">
          <PopoverHeader>
            <Link //LINK FOR SIXTH BUTTON
              href="/"
              style={{ textDecoration: "none" }}
            >
              {SixthLink.map((link) => (
                <Text>Log out</Text>
              ))}
            </Link>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Flex
      transition="0.7s ease"
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "black",
        color: "white",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        bgColor="#333333"
        color="grey"
      />
    </Flex>
  );
};
