import { useEffect, useRef, useState } from "react";
import palettes from "../data/colors";
import style from "./palettes.module.scss";
import gsap from "gsap";
import { useKeyStore } from "../store/keyStore";

const Palletes = () => {
  const { setIsPress } = useKeyStore();

  function press(event: KeyboardEvent) {
    if (event.key) {
      setIsPress(true);
    } else {
      setIsPress(false);
    }
  }
  function up() {
    setIsPress(false);
  }
  useEffect(() => {
    window.addEventListener("keydown", press);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", press);
      window.removeEventListener("keyup", up);
    };
  }, []);
  return (
    <div className={style.container}>
      {palettes.map((palette, index) => {
        return (
          <Palette title={palette.title} colors={palette.colors} key={index} />
        );
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
  const { isPress } = useKeyStore();
  const alert = useRef(null);

  function copy(copyText: string) {
    if (isPress) {
      // vec3
      const result = hexToGL(copyText);
      navigator.clipboard.writeText(result);
    } else {
      // hex
      navigator.clipboard.writeText(copyText);
    }
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
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: color.color, width: color.per + "%" }}
              className={style.color}
              data-color={color.color}
              onClick={() => {
                copy(color.color);
                alertAnimation(color.color);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

const hexToGL = (hex: any) => {
  let alpha = false,
    h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  const r = ((h >>> (alpha ? 24 : 16)) / 255).toFixed(3);
  const g = (
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) /
    255
  ).toFixed(3);
  const b = (
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) /
    255
  ).toFixed(3);
  return "vec3" + "(" + r + ", " + g + ", " + b + ")";
};

export const HexChange = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  useEffect(() => {
    const gl = hexToGL(input);
    setResult(gl);
  }, [input]);
  return (
    <div className={style.hexchange}>
      <div className={style.input}>
        Hex
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </div>
      <div className={style.result}>➞ {result}</div>
    </div>
  );
};
