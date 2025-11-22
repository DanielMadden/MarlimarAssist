const stopTexts = [
  `You replied "stop" which blocks all texts sent from`,
  `No further messages will be sent`,
];

function convertTimestampIntoJSDate(timestamp) {
  const utcString = timestamp.replace(" ", "T") + "Z"; // <- the "Z" marks it as UTC
  return new Date(utcString);
}

function main() {
  const chatWindows = document.getElementsByClassName("chat-window");
  const dateJSCurrent = new Date();

  function getPanel(chatEl) {
    return chatEl.querySelector(".panel.panel-default");
  }

  function getLastTwoMessages(chatEl) {
    const messagesAll = chatEl.querySelectorAll(".row.msg_container");
    if (!messagesAll) return null;
    const latest1 = messagesAll[0];
    const latest2 = messagesAll[1];
    return { latest1, latest2 };
  }

  function checkForChatStop(messageElements) {
    const messageArray = [messageElements.latest1, messageElements.latest2];
    for (const messageEl of messageArray) {
      const pEl = messageEl.querySelector("p");
      const messageText = pEl.innerText;

      for (const stopText of stopTexts) {
        if (messageText.includes(stopText)) {
          return true;
        }
      }
    }
    return false;
  }

  function closeChat(chatEl) {
    const closeElement = querySelector(".panel-heading.top-bar icon_close");
    closeElement.click();
  }

  function highlightChat(chatEl, color) {
    getPanel(chatEl).classList.add(
      `massist-highlight`,
      `massist-highlight-${color}`
    );
  }

  function hideChat(chatEl) {
    chatEl.classList.add("massist-hide");
  }

  function deleteChatElement(chatEl) {
    chatEl.remove();
  }

  function getJSDateOfMessage(messageEl) {
    const timeEl = messageEl.querySelector("time");
    if (!timeEl) return null;

    const timestampMarlimar = timeEl.getAttribute("datetime");
    const dateJSOfMessage = convertTimestampIntoJSDate(timestampMarlimar);

    return dateJSOfMessage;
  }

  for (const chatEl of chatWindows) {
    const messageElems = getLastTwoMessages(chatEl);
    if (!messageElems?.latest1 || !messageElems?.latest2) continue;
    if (checkForChatStop(messageElems)) {
      hideChat(chatEl);
      // deleteChatElement(chatEl);
      continue;
    }
    const dateJSOfMessage = getJSDateOfMessage(messageElems.latest1);
    if (dateJSOfMessage) {
      const diffMs = dateJSCurrent - dateJSOfMessage;
      const diffMinutes = diffMs / 1000 / 60;

      if (diffMinutes >= 360) highlightChat(chatEl, "black");
      else if (diffMinutes >= 240) highlightChat(chatEl, "red");
      else if (diffMinutes >= 120) highlightChat(chatEl, "orange");
      else if (diffMinutes >= 30) highlightChat(chatEl, "yellow");
      else if (diffMinutes >= 15) highlightChat(chatEl, "green");
    } else continue;
  }
  // Array.from(chatWindows).forEach((chatEl) => {
  //   const messages = getLastTwoMessages(chatEl);
  //   if (!messages) return null;
  //   if (!messages.latest1) return null;
  //   if (!messages.latest2) return null;
  //   const mustStop = checkForChatStop(messages);
  //   if (mustStop) {
  //     hideChat(chatEl);
  //     return null;
  //   }
  //   const timestamp = getTimestamp(messages.latest1);
  //   if (!timestamp) return null;
  // });
}

setInterval(() => {
  main();
}, 1000);
