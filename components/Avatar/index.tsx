import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src: string | null | undefined;
}

export function Avatar({ src }: AvatarProps) {
  if (src) {
    <Image
      src={src}
      alt="Avatar"
      className="rounded-full"
      height={"30"}
      width={"30"}
    />;
  }

  return <FaUserCircle size={24} />;
}
