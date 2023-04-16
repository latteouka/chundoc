import Image from "next/image";
import logo from "../public/img/logo.png";
import style from "./logo.module.scss";

const Logo = () => {
  // smooth scroll
  return (
    <div>
      <div className={style.logo}>
        <Image width={30} height={30} src={logo} alt="logo" />
        <div style={{ color: "#64748b" }}>Yi Chun</div>
      </div>
    </div>
  );
};
export default Logo;
