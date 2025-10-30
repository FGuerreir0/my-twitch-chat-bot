# 🎮 Twitch Chat Bot

A fun and interactive **Twitch chat bot** built with **Node.js** and **TMI.js**, designed to engage viewers through games, loyalty points, and custom chat commands.  

🚀 **Live Demo:** [Check it out on my Twitch channel!](https://twitch.tv/fabio_guerreiro)  
🟢 **Deployed on:** [Render](https://render.com/)  

---

## 🧠 Features

- 💬 Custom commands for engaging viewers  
- 🗓️ Schedule and announcements  
- 🏆 Points and leaderboard system  
- 🔊 Text-to-speech using viewer points  
- 🎰 Lottery and mini-games  
- 🔒 Forbidden words filter for “say” feature  
- 🧩 Easy to extend and customize  

---

## 🧾 To-Do List

### ✅ Completed
- [x] Fix engaging “following” message  
- [x] Implement `!so` (shoutout) feature  
- [x] Points leaderboard  
- [x] Text-to-speech feature (using `say` and viewer points)  
- [x] Schedule command  

### 🔧 In Progress / Planned
- [ ] Loyalty points system stored in JSON  
- [ ] VIP Lottery  
- [ ] Choose a custom name for bot points  
- [ ] Create a forbidden word list for the SAY feature  

---

## 🎯 Ways to Earn Points

- [ ] Play **Rock–Paper–Scissors**  
- [ ] Guess the **Number of the Day**  

---

## 💸 Ways to Spend Points

- [ ] Use the **!say** command (text-to-speech)  
- [ ] Become **VIP for a day**  
- [ ] Choose a **game for the streamer** to play  

---

## ⚙️ Tech Stack

- **Node.js**  
- **TMI.js** for Twitch chat integration  
- **say** (npm) for text-to-speech  
- **JSON-based persistence** for lightweight data storage  

---

## 🏁 Getting Started

1. Clone this repository:  
   ```bash
    git clone https://github.com/yourusername/twitch-chat-bot.git
    cd twitch-chat-bot
   ```
2. Install dependencies:
    ```bash
      npm install
    ```
3. Create a .env file with your Twitch credentials:
    ```env
      TWITCH_USERNAME=your_bot_name
      TWITCH_OAUTH_TOKEN=your_tmi_token
      TWITCH_CHANNEL=your_channel_name
    ```

4. Run the bot:
    ```bash
      npm run start
    ```

## 🧑‍💻 Contributing

Pull requests are welcome!
If you’d like to add new mini-games or features, feel free to open an issue or submit a PR.