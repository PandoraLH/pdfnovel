import puppeteer from "puppeteer";
import cheerio from "cheerio";

async function fetchPDFJnovels(browser) {
   //craw pdf file
   const pdfUrl = "https://jnovels.com/11light-1novel20-pdf/";
   const page = await browser.newPage();
   await page.goto(pdfUrl, { waitUntil: "networkidle2" });
   const html = await page.content();

   //get the ol in the html
   const $ = cheerio.load(html);
   const ol = $("ol");

   //get the li - children of the ol and save it to liTags
   const liTags = ol.children("li");

   //loop through li tag and get name, href of every single li
   const items = liTags
      .map((i, el) => {
         const href = $(el).find("a").attr("href");
         return href ? { name: $(el).text(), href } : null;
      })
      .get()
      .filter((item) => item !== null);

   //  Loop through the items and fetch the information from each link in href
   for (let i = 0; i < items.length; i++) {
      try {
         await page.goto(items[i].href, { waitUntil: "networkidle2" });
         let imgSrc = null;

         //get the img in .featured-media
         try {
            imgSrc = await page.$eval(".featured-media img", (img) => img.src);
         } catch (error) {
            console.log(`Missing image at place ${i}`);
         }

         //get description
         const description = [];

         //get the synopsis in .synopsis-description p
         let synopsis = await page.$$eval(".synopsis-description p", (pArr) => {
            let synopsis = "";
            for (let i = 0; i < pArr.length; i++) {
               synopsis += pArr[i].innerText.trim() + " ";
            }
            return synopsis.trim();
         });
         if (synopsis) {
            description.push({ panel: null });
            description.push({ description: null });
            description.push({ synopsis: synopsis });
         } else {
            //if it doesn't has the synopsis-description p
            //get the content in every p in .post-content.clear
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
            //the first .p save to description
            if (pArr.length > 1) {
               const descriptionText = await pArr[1].evaluate((el) =>
                  el.innerText.trim().replaceAll("\n", " ")
               );
               description.push({ description: descriptionText });
            }
            //the second .p sae to sysnopsis
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
                  // Erase after the word "Associated Names"
                  synopsis = synopsis.replace("Associated Names", "");
               }
               description.push({ synopsis: synopsis.trim() });
            }
         }

         //get the ol which saved the volume and href
         const liData = await page.$$(
            "ol:not(.comment-list):not(.children) li"
         );
         const pdfVolume = [];
         //loop inside the ol to get the child, and get href of that child
         for (let j = 0; j < liData.length; j++) {
            const children = await liData[j].$$eval("*", (childElements) =>
               childElements
                  .map((child) => {
                     const href = child.getAttribute("href");
                     return href ? { link: href } : null;
                  })
                  .filter(Boolean)
            );
            pdfVolume.push(...children);
         }

         //save all to items
         items[i].imgSrc = imgSrc;
         items[i].description = description;
         items[i].pdfVolume = pdfVolume;
      } catch (err) {
         console.error(err);
      }
   }
   return items;
}

async function fetchEpubJnovels(browser) {
   //get the epub link
   const epubUrl = "https://jnovels.com/hlight-10novel21-epub/";
   const page = await browser.newPage();
   await page.goto(epubUrl, { waitUntil: "networkidle2" });
   const html = await page.content();

   const $ = cheerio.load(html);
   const ol = $("ol");
   const liTags = ol.children("li");

   const items = liTags
      .map((i, el) => {
         const href = $(el).find("a").attr("href");
         return href ? { name: $(el).text(), href } : null;
      })
      .get()
      .filter((item) => item !== null);

   // Similar to pdf, but just get the download link
   for (let i = 0; i < items.length; i++) {
      try {
         await page.goto(items[i].href, { waitUntil: "networkidle2" });

         const liData = await page.$$(
            "ol:not(.comment-list):not(.children) li"
         );
         const epubVolume = [];
         for (let j = 0; j < liData.length; j++) {
            const children = await liData[j].$$eval("*", (childElements) =>
               childElements
                  .map((child) => {
                     const href = child.getAttribute("href");
                     return href ? { link: href } : null;
                  })
                  .filter(Boolean)
            );
            epubVolume.push(...children);
         }
         items[i].epubVolume = epubVolume;
      } catch (err) {
         console.error(err);
      }
   }
   return items;
}

export default async function fetchNovels() {
   const browser = await puppeteer.launch();
   try {
      let pdfItems = await fetchPDFJnovels(browser);
      let epubItems = await fetchEpubJnovels(browser);

      //attach the epub volume and pdf volume to one object
      for (let i = 0; i < pdfItems.length; i++) {
         for (let j = 0; j < epubItems.length; j++) {
            if (pdfItems[i].name.trim() === epubItems[j].name.trim()) {
               pdfItems[i].epubVolume = epubItems[j].epubVolume;
               break;
            }
         }
      }
      return pdfItems;
   } catch (error) {
      console.error(error);
   } finally {
      await browser.close();
   }
}
