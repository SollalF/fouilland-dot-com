import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.jpg"
        alt="logo"
        className="rounded-full"
        width={48}
        height={48}
      />
    </Link>
  );
};

export default Logo;
