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

// reload page
await this.page.reload({
  waitUntil: "networkidle0",
});

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
