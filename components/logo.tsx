import { Image } from "@heroui/image";

interface LogoProps {
  size?: number;
  width?: number;
  height?: number;
  [key: string]: any;
}

export const Logo = ({ size = 36, width, height, ...props }: LogoProps) => (
  <Image
    src="/tutel.jpg"
    alt="Tutel Logo"
    width={size || width}
    height={size || height}
    className="rounded-full"
    {...props}
  />
);
