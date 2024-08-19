import Image from "next/image";
import logo from "../public/img/logo.png";
import style from "./logo.module.scss";
import { Toaster } from "react-hot-toast";

const Logo = () => {
  // smooth scroll
  return (
    <div>
      <Toaster position="bottom-center" />
      <div className={style.logo}>
        <Image width={30} height={30} src={logo} alt="logo" />
        <div style={{ color: "#64748b" }}>chundev</div>
      </div>
    </div>
  );
};
export default Logo;
