function main() {
  const chatWindows = document.getElementsByClassName("chat-window");
  console.log(chatWindows);

  function getLatestTimestampForChat(chatEl) {
    const times = chatEl.querySelectorAll(
      ".msg_container_base .msg_container time"
    );
    if (!times.length) return null;

    const latestTimeEl = times[0];

    console.log(latestTimeEl);
    const dateTime = latestTimeEl.getAttribute("datetime");
    console.log(dateTime);

    return { element: latestTimeEl, dateTime };
  }

  Array.from(chatWindows).forEach((chatEl) => {
    const latest = getLatestTimestampForChat(chatEl);
    if (latest) {
      // console.log(dateTime);
    }
  });
}

setInterval(() => {
  main();
}, 1000);
