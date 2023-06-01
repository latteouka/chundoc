[puppeteer](https://pptr.dev/)

## puppeteer-core

如果你是在自己電腦裝來爬，就直接裝 puppeteer 可以不用想太多。

包在 electron 時（或是 serverless 服務之類），會不能直接用原本的 puppeteer（會順便幫你裝最新 puppeteer 可用的 chrome），
路徑解析會有問題。要改用 puppeteer-core 自己找路徑。

如果有特殊的安裝環境就要自己想辦法修正。
下面是 electron 實作 ok 的 win32、win64、MacOS 的預設路徑。

```ts
import puppeteer from "puppeteer-core";
import fs from "fs";

const getDefaultOsPath = () => {
  if (process.platform === "win32") {
    const win64 = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;
    if (fs.existsSync(win64)) {
      return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    }
    const win32 = String.raw`C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`;
    if (fs.existsSync(win32)) {
      return "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
    }
    return "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
  } else {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }
};

// 不看
const headlessOptions = {
  executablePath: getDefaultOsPath(),
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  headless: true,
  ignoreHTTPSErrors: true,
};

// 想看
const watchOptions = {
  executablePath: getDefaultOsPath(),
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  headless: false,
  ignoreHTTPSErrors: true,
};
```

## init

```ts
this.browser = await puppeteer.launch(watchOptions);
this.page = await this.browser?.newPage()!;
```

## basic

```ts
// go to and wait
await this.page.goto(url, {
  waitUntil: "networkidle0",
});
// reload page
await this.page.reload({
  waitUntil: "networkidle0",
});

// 上述這種內容有更新的動作，做下一步之前waitFor特定元素比較保險

// wait for element defined by XPath appear in page
// can also wait for other things
await this.page.waitForXPath("/html/body/form/p/input[1]");

// just wait
await this.page.waitForTimeout(1000);

// search by name
const loginAccount: any = await this.page.$("[name=id]");
await loginAccount.type(account);

// search by xpath
await this.page.$x('//*[@id="tabBody_3"]/table/tbody/tr[2]/td[6]');

// search by text
const search = "886" + this.currentPhone.slice(1, 10);
await this.page.$x(`//u[contains(text(), '${search}')]`);

// fetch content
cursor = await this.page.$x("/html/body/table[1]/tbody/tr[3]/td[2]");
if (cursor.length === 1) {
  const phoneNumber = await this.page.evaluate(
    (el) => el.textContent,
    cursor[0]
  );
  // deal with the result
} else {
  // deal with the not-found situation
}

// close browser
// 如果同時間有別的東西一起在跑會被影響
// 可以用++--數量決定要不要關
this.browser.close();
```

## iframe

```ts
// should check which frame you want
const frames = this.page.frames();

// wait for iframe content to be loaded
frames[1].waitForSelector("a");

// search by tag and content
const result: any = await frames[1].$x(`//a[contains(text(), '${search}')]`);
const locate: any = await this.page.$x("//a[contains(text(), '執行定位')]");

// click on
locate[0].click();
```

## 點擊後切換到新頁

```ts
const pageTarget = this.page.target();

await result[0].click();

const newTarget = await this.browser.waitForTarget(
  (target) => target.opener() === pageTarget
);
const newPage = await newTarget.page();

this.page = newPage;
```

## Screenshot + base64

```ts
const elementXPath = "/html/body/form/table/tbody/tr[4]/td[2]";
const elementHandle = await this.page.$x(elementXPath);
const boundingBox = await elementHandle[0].boundingBox();

if (!boundingBox) return false;

const x = boundingBox.x + 8;
const y = boundingBox.y + 1;
// const width = boundingBox.width / 2 - 10;
const width = 104;
const height = 30;

await this.page.screenshot({
  path: "verification.png",
  clip: {
    x,
    y,
    width,
    height,
  },
});

const base64Image = imageToBase64("verification.png");
const response = await electronFetch("https://gotcha.chundev.com/insloc/ocr", {
  method: "POST",
  body: JSON.stringify({ image: base64Image }),
  headers: { "Content-Type": "application/json" },
});
const body = await response.json();
```

```ts
export function imageToBase64(imagePath: string) {
  const imageData = fs.readFileSync(imagePath);
  const base64Data = imageData.toString("base64");
  return base64Data;
}
```

### Server side check

```js
const base64regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
if (!base64regex.test(image)) {
  res.json({ message: "The image is not base64 encoded." });
  return;
}
```
