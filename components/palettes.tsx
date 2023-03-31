import { useRef } from "react";
import palettes from "../data/colors";
import style from "./palettes.module.scss";
import gsap from "gsap";

const Palletes = () => {
  return (
    <div className={style.container}>
      {palettes.map((palette) => {
        return <Palette title={palette.title} colors={palette.colors} />;
      })}
    </div>
  );
};
export default Palletes;

interface Color {
  color: string;
  per: number;
}

interface Props {
  title: string;
  colors: Color[];
}
const Palette = ({ title, colors }: Props) => {
  const alert = useRef(null);

  function copy(copyText: string) {
    navigator.clipboard.writeText(copyText);
  }

  function alertAnimation(color: string) {
    gsap.set(alert.current, {
      color,
    });
    gsap.to(alert.current, {
      opacity: 1,
      duration: 0.4,
      onComplete: () => {
        gsap.to(alert.current, {
          opacity: 0,
          delay: 0.3,
          duration: 0.3,
        });
      },
    });
  }

  return (
    <div className={style.palette}>
      <div className={style.title}>
        {title}
        <div
          className={style.alert}
          style={{ color: colors[0].color }}
          ref={alert}
        >
          Copied!
        </div>
      </div>
      <div className={style.colors}>
        {colors.map((color) => {
          return (
            <div
              style={{ backgroundColor: color.color, width: color.per + "%" }}
              className={style.color}
              onClick={() => {
                copy(color.color);
                alertAnimation(color.color);
              }}
            >
              {color.color}
            </div>
          );
        })}
      </div>
    </div>
  );
};
