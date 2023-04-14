## Context

以 window.scrollY 為例。

```ts
interface ScrollValue {
  scrollY: number;
}

// 順帶一提現在不用很多舊教學影片裡看到的
// const MyComponent: React.FC<> 了
// https://medium.com/raccoons-group/why-you-probably-shouldnt-use-react-fc-to-type-your-react-components-37ca1243dd13
// https://github.com/typescript-cheatsheets/react/blob/main/README.md#useful-react-prop-type-examples

interface Props {
  children: React.ReactNode;
}

export const ScrollContext = React.createContext<ScrollValue>({ scrollY: 0 });

const ScrollObserver = ({ children }: Props) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollObserver;
```
