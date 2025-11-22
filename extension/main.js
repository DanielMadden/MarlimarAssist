function main() {
  const chatWindows = document.getElementsByClassName("chat-window");
  console.log(chatWindows);

  function getLatestTimestampForChat(chatEl) {
    const times = chatEl.querySelectorAll(
      ".msg_container_base .msg_container time"
    );
    if (!times.length) return null;

    const latestTimeEl = times[times.length - 1];

    const dateTime = latestTimeEl.getAttribute("datetime");
    const text = latestTimeEl.textContent.trim();

    return { element: latestTimeEl, dateTime, text };
  }

  Array.from(
    chatWindows.forEach((chatEl) => {
      const latest = getLatestTimestampForChat(chatEl);
      if (latest) {
        console.log(
          "Chat ID:",
          chatEl.id,
          "Latest:",
          latest.datetime || latest.text
        );
      }
    })
  );
}

setInterval(() => {
  main();
}, 1000);
