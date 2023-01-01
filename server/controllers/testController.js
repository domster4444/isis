const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const puppeteer = require("puppeteer");

//? joi validator

exports.testControl = catchAsyncErrors(async (req, res) => {
  const pageNo = await req.query.page;
  console.log(pageNo);

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(`https://merojob.com/search/?page=${pageNo}`);
  const data = await page.evaluate(() => {
    const apiData = [];

    Array.from(document.querySelectorAll("#search_job .card-body")).map(async (eachEvent) => {
      let eventObject = {
        name: "not available",
        jobName: "not available",
        location: "not available",
        skill: [],
      };
      eventObject.name = eachEvent.querySelectorAll("h1.media-heading a")[0].textContent.trimEnd(`\n`).trimStart(`\n`);
      eventObject.jobName = eachEvent.querySelectorAll("h3.h6 a")[0].textContent.trimEnd(`\n`).trimStart(`\n`);
      // const fetchedSkill = eachEvent.getElementsByClassName("div.media div.media-body span.badge");
      apiData.push(eventObject);
    });
    return apiData;
  });
  await res.status(200).json({
    page: pageNo,
    success: true,
    message: `you  the test route  `,
    data,
  });

  // new ErrorHandler("error thrown in testController", 400)
});
