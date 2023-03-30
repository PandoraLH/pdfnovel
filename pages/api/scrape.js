import puppeteer from "puppeteer";
import cheerio from "cheerio";

export default async (req, res) => {
   const url = "https://jnovels.com/11light-1novel20-pdf/";

   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto(url, { waitUntil: "networkidle2" });
   const html = await page.content();

   const $ = cheerio.load(html);
   const ol = $("ol");
   const liTags = ol.children("li");

   const items = liTags
      .map((i, el) => ({
         name: $(el).text(),
         href: $(el).find("a").attr("href"),
      }))
      .get();

   //  Loop through the items and fetch the imgSrc from each link
   for (let i = 0; i < 5; i++) {
      try {
         await page.goto(items[i].href, { waitUntil: "networkidle2" });
         const imgSrc = await page.$eval(
            ".featured-media img",
            (img) => img.src
         );
         const description = [];
         let synopsis = await page.$$eval(".synopsis-description p", (pArr) => {
            let synopsis = "";
            for (let i = 0; i < pArr.length; i++) {
               synopsis += pArr[i].innerText.trim() + " ";
            }
            return synopsis.trim();
         });
         if (synopsis) {
            description.push({ panel: "" });
            description.push({ description: "" });
            description.push({ synopsis: synopsis });
         } else {
            const pArr = await page.$$(
               ".post-content.clear p:not(.jp-relatedposts p)"
            );
            if (pArr.length > 0) {
               const panel = pArr[0];
               const panelText = await panel.evaluate((el) =>
                  el.innerText.trim()
               );
               description.push({ panel: panelText });
            }
            if (pArr.length > 1) {
               const descriptionText = await pArr[1].evaluate((el) =>
                  el.innerText.trim().replaceAll("\n", " ")
               );
               description.push({ description: descriptionText });
            }
            if (pArr.length > 2) {
               const synopsisArr = pArr.slice(2);
               synopsis = "";
               for (let i = 0; i < synopsisArr.length; i++) {
                  const text = await synopsisArr[i].evaluate((el) =>
                     el.innerText.replaceAll("\n", " ").trim()
                  );
                  synopsis += text + " ";
               }
               const associatedNamesIndex =
                  synopsis.indexOf("Associated Names");
               if (associatedNamesIndex !== -1) {
                  synopsis = synopsis.slice(0, associatedNamesIndex);
                  // Erase the word "Associated Names" too
                  synopsis = synopsis.replace("Associated Names", "");
               }
               description.push({ synopsis: synopsis.trim() });
            } else if (pArr.length === 1) {
               description.push({ synopsis: "" });
            }
         }

         const liData = await page.$$(
            "ol:not(.comment-list):not(.children) li"
         );
         const volumeArr = [];
         for (let j = 0; j < liData.length; j++) {
            const liText = await liData[j].$eval("a", (a) =>
               a.previousSibling.textContent
                  .replaceAll("—", "")
                  .replaceAll("–", "")
                  .replaceAll("-", "")
                  .trim()
            );

            const liLink = await liData[j].$eval("a", (a) => a.href.trim());
            volumeArr.push({ volume: liText, link: liLink });
         }
         items[i].imgSrc = imgSrc;
         items[i].description = description;
         items[i].volumeArr = volumeArr;
      } catch (err) {
         console.error(err);
      }
   }

   await browser.close();
   res.status(200).json({ items });
};
