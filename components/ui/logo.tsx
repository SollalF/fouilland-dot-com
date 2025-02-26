import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo.jpg"
      alt="logo"
      className="rounded-full"
      width={48}
      height={48}
    />
  );
};

export default Logo;
