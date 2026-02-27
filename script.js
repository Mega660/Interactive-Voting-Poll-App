const pollLabels = document.querySelectorAll(".pollarea label");
const totalVotesEl = document.getElementById("total");
const resetBtn = document.getElementById("resetBtn");

let votes = Array(pollLabels.length).fill(0);

// Update the poll display
function updatePoll() {
    const totalVotes = votes.reduce((a, b) => a + b, 0);
    totalVotesEl.textContent = totalVotes;

    pollLabels.forEach((label, index) => {
        const progress = label.querySelector(".progress");
        const percent = label.querySelector(".percent");
        const pct = totalVotes === 0 ? 0 : Math.round((votes[index] / totalVotes) * 100);

        progress.style.setProperty("--w", pct);
        percent.textContent = pct + "%";

        if (votes[index] > 0) {
            label.classList.add("active");
        } else {
            label.classList.remove("active");
        }
    });
}

// Handle click on each poll option
pollLabels.forEach((label, index) => {
    label.addEventListener("click", () => {
        votes[index]++;
        updatePoll();
    });
});

// Reset button
resetBtn.addEventListener("click", () => {
    votes.fill(0);
    updatePoll();
});

// Initial render
updatePoll();