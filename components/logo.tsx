import style from "./logo.module.scss";
import { Toaster } from "sonner";

const Logo = () => {
  // smooth scroll
  return (
    <div>
      <div className={style.logo}>
        {/* <Image width={30} height={30} src={logo} alt="logo" /> */}
        <div style={{ color: "#64748b" }}>chundev</div>
      </div>
    </div>
  );
};
export default Logo;
