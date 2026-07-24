import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

const Logo = () => {
  return (
    <Link href="/" aria-label={`${siteConfig.name} home`}>
      <Image
        src="/logo.jpg"
        alt={`${siteConfig.name} logo`}
        className="rounded-full"
        width={48}
        height={48}
      />
    </Link>
  );
};

export default Logo;
