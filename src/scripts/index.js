import { removeAllFilters, renderFilters, renderJobs } from "./views.js";

const clearFiltersBtn = document.querySelector(".clear-keywords-btn");
const jobsList = document.querySelector(".jobs");

clearFiltersBtn.onclick = (e) => {
  removeAllFilters();
};

renderFilters();
renderJobs();

new ResizeObserver((e) => {
  let currentHight = e[0].contentRect.height + 20;
  jobsList.style.marginTop = currentHight + "px";
}).observe(document.querySelector(".filter-bar-container"));
