import { Image } from "@heroui/image";

interface LogoProps {
  size?: number;
  width?: number;
  height?: number;
  [key: string]: any;
}

export const Logo = ({ size = 36, width, height, ...props }: LogoProps) => (
  <Image
    alt="Tutel Logo"
    className="rounded-full"
    height={size || height}
    src="/tutel.jpg"
    width={size || width}
    {...props}
  />
);
