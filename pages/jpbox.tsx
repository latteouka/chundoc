import styles from "./jpbox.module.scss";

const JPBOX = () => {
  return (
    <div className={styles.container}>
      <h1>JPBox 2.0</h1>
      <div className={styles.linkWrapper}>
        <a
          href="https://apps.apple.com/tw/app/jpbox-2-0-%E6%97%A5%E6%96%87%E5%96%AE%E5%AD%97-%E9%96%93%E9%9A%94%E9%87%8D%E8%A4%87/id6450626859"
          className={styles.link}
          target="_blank"
        >
          App Store
        </a>
        <div className={styles.link}> / </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.chundev.jpbox"
          className={styles.link}
          target="_blank"
        >
          Play Store
        </a>
      </div>
    </div>
  );
};
export default JPBOX;
