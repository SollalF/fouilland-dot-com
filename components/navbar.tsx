import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/ui/logo";
const Navbar = () => {
  return (
    <Card className="m-1 p-1">
      <Logo />
    </Card>
  );
};

export default Navbar;
