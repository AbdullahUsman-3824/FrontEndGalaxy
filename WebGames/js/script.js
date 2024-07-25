let gameCards = Array.from(document.getElementsByClassName("gameCard"));
const cardLinks = ["html/tik.html", "html/rps.html", "html/snake.html"];

gameCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    window.location.href = cardLinks[index];
  });
});
