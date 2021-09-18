export default function updateYearinfo() {
  const yearInfoRefs = document.querySelectorAll(".content__year");
  yearInfoRefs.forEach((yearInfo) => {
    yearInfo.textContent = yearInfo.textContent.slice(0, 4);
  });
}
