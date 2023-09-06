import Head from "next/head";
import styles from "./jpbox.module.scss";

const JPBOX = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>JPBox 2.0</title>
      </Head>
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
      {/* <div className={styles.draw}> */}
      {/*   <a */}
      {/*     href="https://forms.gle/CaHyLUXndyfo67ue8" */}
      {/*     className={styles.drawlink} */}
      {/*     target="_blank" */}
      {/*   > */}
      {/*     抽獎登記點我!! */}
      {/*   </a> */}
      {/* </div> */}
      <div className={styles.info}>
        <div className={styles.question}>Q：跟之前的版本有什麼不一樣？</div>
        <div className={styles.answer}>
          A：全字卡現已加入重音標記、發音校正完畢。目前持續新增例句及文法卡片。也加入帳號同步機制，即使換了設備或重新安裝，你都能透過綁定的帳號將記憶紀錄同步回來～
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：目前字卡數量？</div>
        <div className={styles.answer}>
          A：N5(662)、N4(557)、N3(1564)、N2(1425)、N1(2468)。
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：間隔重複機制是什麼？</div>
        <div className={styles.answer}>
          A：人的記憶會在隔一段時間或是忘記後再次複習而加強，只需依照直覺回答記得不記得，讓APP安排複習時間即可利用此機制牢記內容。但記憶力是不能請假的，請盡量每天刷完一次字卡！
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：按記得的時機是？</div>
        <div className={styles.answer}>
          A：有印象的字卡就按記得，會將卡片提升一個間隔等級，不記得或是記憶曖昧則按不記得，會重置這張卡片的間隔等級（於是更快需要複習它）。
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：有沒有訂閱差在哪裡？</div>
        <div className={styles.answer}>
          A：看過的字（Read）超過200後需要訂閱解開上限，其他功能無限制，可慢慢試用看看能不能堅持下去！另訂閱也增加每日新單字數量選項（20,25）。
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：連結帳號可以做什麼？</div>
        <div className={styles.answer}>
          A：使用者資料及記憶進度會與連結帳號綁定，即使APP刪除或更換設備，都能在登入時同步回來。蘋果用戶可以兩種都連結。
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：新單字一天只能10個嗎？</div>
        <div className={styles.answer}>
          A：預設10個，可在Settings依照需求選擇其他數量（10個到中期複習量就會有點花時間）
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：Date跟Number是什麼功能？</div>
        <div className={styles.answer}>
          A：每日練習聽力，單點聽發音，長按可查看提示。
        </div>
      </div>
    </div>
  );
};
export default JPBOX;
