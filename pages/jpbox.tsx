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
      <div className={styles.info}>
        <div className={styles.question}>Q：跟之前的版本有什麼不一樣？</div>
        <div className={styles.answer}>
          A：全字卡現已加入重音標記、發音校正完畢。目前持續新增例句及文法卡片中，目標是所有字卡都有多個例句可以參考。
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：間隔重複機制是什麼？</div>
        <div className={styles.answer}>
          A：人的記憶會在隔一段時間後或是忘記後再次複習而加強，就讓App來幫你排時間吧！你只需要依照自己的直覺回答記得或不記得即可，長期下來刷過的單字很難忘記！
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：我何時才按記得呢？</div>
        <div className={styles.answer}>
          A：覺得已經有印象的字就按記得，會把卡片提升一個間隔等級，而不記得或是記憶很曖昧的話就按不記得，會重置這張卡片的間隔等級（於是你會更快需要複習它），見到New卡當然大部分的場合只能直接按不記得囉。
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：連續登入可以做什麼？</div>
        <div className={styles.answer}>A：會對拿到的Exp跟金幣產生加乘！</div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：有沒有訂閱差在哪裡？</div>
        <div className={styles.answer}>
          A：看過的字（Read）超過200後就需要訂閱解開上限，其他功能都是完全解放的唷。如果這個方法是適合的你再考慮訂閱吧～
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：連結帳號可以做什麼？</div>
        <div className={styles.answer}>
          A：你的資料會跟連結的帳號綁定，之後不管是APP刪除重裝或是換了手機，都能在最初登入時同步回來！
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：新單字一天只能10個嗎？</div>
        <div className={styles.answer}>
          A：在Settings可以選擇10或15，即使是10到中期複習量就會有點花時間了喔～
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：日期跟???是什麼功能？</div>
        <div className={styles.answer}>
          A：可以練習聽力用的，???點了會聽到數字，可以測試自己聽不聽得懂，長按後可以看到提示。
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：稱號可以做什麼？</div>
        <div className={styles.answer}>
          A：沒有什麼功能😆，希望能增加一點單字量囉，有想要加上去的可以告訴我。
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.question}>Q：Badge呢？</div>
        <div className={styles.answer}>
          A：這邊除了一些累積的里程碑外，其實大部分是選擇發音特殊的數字，長按可以看到提示。
        </div>
      </div>
    </div>
  );
};
export default JPBOX;
