const createDate = (count: number = 0) => {
  return new Date(Date.now() + count * 60 * 1000);
}

export const demoInitMessage = (count: number = 0) => ({
  id: +(new Date(count)),
  title: "GM RAH - Bear M RAH - BeaM RAH - Bea",
  lastTime: createDate(count),
  lastMessage:
    "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
  avatar: "images/wod_1.png",
  role: "Game Master",
});


export const demoArrayOfInitMessages = Array.from({length: 5}, (_, i) => demoInitMessage(i * 5));