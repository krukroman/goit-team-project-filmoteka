export default function updateRating() {
  const raitingRefs = document.querySelectorAll(".content__rating");
  raitingRefs.forEach((raitingRef) => {
    if (!raitingRef.textContent.includes(".")) {
      raitingRef.textContent += ".0";
    }
  });
}