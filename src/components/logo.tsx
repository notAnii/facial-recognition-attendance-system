import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <Link href="/" passHref>
    <Image src={"/flower.webp"} alt={""} width={50} height={50} />
  </Link>
);

export default Logo;
