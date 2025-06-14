---
sidebar_position: 1
---

# [ani] 無限向左輪播

```typescript
interface Props {
  initialOffsetX: number;
  contentWidth: number;
  className: string;
  children: React.ReactNode;
}

const SliderContainer = ({
  children,
  initialOffsetX,
  className,
  contentWidth,
Props) => {
  const { innerWidth } = useContext(SizeContext);
  const refScrollX = useRef<number>(initialOffsetX);
  const refContainer = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);

  // 如果現在視窗比內容寬度短的話就用動畫
  const enable = innerWidth < contentWidth;

  // custom hook: /snippets/[hook]useAnimationFrame
  // 用requestAnimationFrame一直重複做scrollLeft
  // 如果滾超過內容寬度就歸零
  useAnimationFrame(
    enable,
    useCallback(() => {
      const { current: elContainer } = refContainer;
      const { current: elContent } = refContent;

      if (elContainer && elContent) {
        // 可改速度
        refScrollX.current += 0.5;
        elContainer.scrollLeft = refScrollX.current;
        if (elContainer.scrollLeft >= elContent.clientWidth) {
          refScrollX.current = 0;
          elContainer.scrollLeft = 0;
        }
      }
    }, [])
  );

  // 將inline-block的內容whitespace-nowrap 擺2份
  // 第一份左滑到歸零都還是看得見第二份inline排在一起的內容
  return (
    <div
      ref={refContainer}
      className={`overflow-hidden whitespace-nowrap w-full ${className}`}
    >
      <div ref={refContent} className="inline-block">
        {children}
      </div>
      <div className={enable ? "inline-block" : "hidden"}>{children}</div>
    </div>
  );
};

interface itemProps {
  children: React.ReactNode;
  width: number;
}

export const SliderItem = ({ children, width }: itemProps) => {
  return (
    <div className="inline-flex items-center justify-center" style={{ width }}>
      {children}
    </div>
  );
};

export default SliderContainer;
```
