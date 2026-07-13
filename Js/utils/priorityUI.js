export function renderSelectedPriority(dropdown, priority) {
    if (!priority) return;

    const selected = dropdown.querySelector(".dropdown-selected");

    selected.innerHTML = `
      <span
        class="priority-badge"
        style="
          background:${priority.color};
          color:white;
        "
      >
        ${priority.name}
      </span>
    `;
}