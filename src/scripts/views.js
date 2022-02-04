import { filterjobs, jobs } from "./jobs.js";

const jobsList = document.querySelector(".jobs");
const filterList = document.querySelector(".filter-keywords");

let myJobs = jobs;

let myFilterKeywords = new Set();

const generateJobLogoDOM = (job) => {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("co-img-container");
  const img = document.createElement("img");
  img.setAttribute("alt", "Company logo");
  img.src = job.logo;
  imgContainer.appendChild(img);
  return imgContainer;
};

const generateJobInfoDOM = (job) => {
  const jobInfo = document.createElement("div");
  jobInfo.classList.add("job-info");

  //main info
  const mainInfo = document.createElement("div");
  mainInfo.classList.add("main-info");
  const companyName = document.createElement("h1");
  companyName.classList.add("co-name");
  companyName.textContent = job.company;
  mainInfo.appendChild(companyName);
  if (job.new) {
    const jobNewTag = document.createElement("h2");
    jobNewTag.classList.add("job-new-tag");
    jobNewTag.textContent = "NEW!";
    mainInfo.appendChild(jobNewTag);
  }
  if (job.featured) {
    const jobFeaturedTag = document.createElement("h2");
    jobFeaturedTag.classList.add("job-featured-tag");
    jobFeaturedTag.textContent = "FEATURED";
    mainInfo.appendChild(jobFeaturedTag);
  }
  jobInfo.appendChild(mainInfo);

  //job title
  const jobTitle = document.createElement("h1");
  jobTitle.className = "job-title";
  jobTitle.textContent = job.position;
  jobInfo.appendChild(jobTitle);

  //extra info
  const extraInfo = document.createElement("div");
  extraInfo.className = "extra-info";
  extraInfo.innerHTML = `<h4>${job.postedAt}</h4>
  <span class="dot"></span>
  <h4>${job.contract}</h4>
  <span class="dot"></span>
  <h4>${job.location}</h4>`;
  jobInfo.appendChild(extraInfo);

  return jobInfo;
};

const keywordOnclickHandler = (e) => {
  if (!myFilterKeywords.has(e.target.textContent)) {
    myFilterKeywords.add(e.target.textContent);
    renderFilters();
    renderJobs();
  }
};

const generateJobKeywordsDOM = (job) => {
  const jobKeywords = document.createElement("ul");
  jobKeywords.className = "job-keywords";

  const keywordRole = document.createElement("li");
  keywordRole.className = "keyword";
  keywordRole.textContent = job.role;
  jobKeywords.appendChild(keywordRole);
  keywordRole.onclick = keywordOnclickHandler;

  const keywordLevel = document.createElement("li");
  keywordLevel.className = "keyword";
  keywordLevel.textContent = job.level;
  jobKeywords.appendChild(keywordLevel);
  keywordLevel.onclick = keywordOnclickHandler;

  for (const language of job.languages) {
    const keywordLang = document.createElement("li");
    keywordLang.className = "keyword";
    keywordLang.textContent = language;
    jobKeywords.appendChild(keywordLang);
    keywordLang.onclick = keywordOnclickHandler;
  }

  for (const tool of job.tools) {
    const keywordtool = document.createElement("li");
    keywordtool.className = "keyword";
    keywordtool.textContent = tool;
    jobKeywords.appendChild(keywordtool);
    keywordtool.onclick = keywordOnclickHandler;
  }

  return jobKeywords;
};

const generateJobCardDOM = (job) => {
  const cardListItem = document.createElement("li");
  cardListItem.classList.add("job-item");
  if (job.new && job.featured) cardListItem.classList.add("hot-card");

  const logo = generateJobLogoDOM(job);
  cardListItem.appendChild(logo);

  const jobInfo = generateJobInfoDOM(job);
  cardListItem.appendChild(jobInfo);

  const jobKeywords = generateJobKeywordsDOM(job);
  cardListItem.appendChild(jobKeywords);

  return cardListItem;
};

export const renderJobs = () => {
  jobsList.innerHTML = "";
  if (myJobs) {
    for (const job of filterjobs(myJobs, myFilterKeywords)) {
      jobsList.appendChild(generateJobCardDOM(job));
    }
  } else {
    loadJobsData();
  }
};

const removeKeywordFromFilter = (keyword) => {
  myFilterKeywords.delete(keyword);
  renderFilters();
  renderJobs();
};

export const renderFilters = () => {
  if (!myFilterKeywords.size > 0) {
    filterList.parentElement.classList.add("hide");
    filterList.innerHTML = "";
    return;
  }
  filterList.innerHTML = "";
  for (const keyword of myFilterKeywords) {
    const filterKeywordItem = document.createElement("li");
    filterKeywordItem.className = "filter-keyword";
    filterKeywordItem.innerHTML = `<span class="keyword">${keyword}</span>
     <div class="img-container disabled">
      <img
        class="remove-keyword"
        src="images/icon-remove.svg"
        alt=""
      />
    </div>`;
    filterList.appendChild(filterKeywordItem);
    filterList.lastChild.querySelector(".img-container").onclick = (e) => {
      removeKeywordFromFilter(keyword);
    };
  }
  filterList.parentElement.classList.remove("hide");
};

export const removeAllFilters = () => {
  myFilterKeywords = new Set();
  renderFilters();
  renderJobs();
};
