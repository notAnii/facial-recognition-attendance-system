import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <Link href="/" passHref>
    <Image src={"/logo.png"} alt={""} width={60} height={60} />
  </Link>
);

export default Logo;
