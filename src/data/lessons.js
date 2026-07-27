export const LESSONS = {
  "intro-blockchain": {
    id: "intro-blockchain",
    title: "Introduction to Blockchain",
    blocks: [
      {
        type: "read",
        emoji: "🚀",
        title: "What Even Is a Blockchain?",
        content:
          "Imagine a notebook that lives on a million computers at once. When someone writes in it, every single copy updates instantly. Nobody can tear out a page, erase a line, or sneak in a fake entry — because everyone would notice. That notebook is a blockchain. It is a shared, tamper-proof record book that runs on the internet, owned by nobody but trusted by everybody.",
      },
      {
        type: "example",
        emoji: "🍕",
        title: "The Pizza Analogy",
        content:
          "You and 30 friends share a pizza order tracker. Every time someone adds toppings, all 30 phones buzz with the update. If one friend tries to change 'extra cheese' to 'pineapple' after the order is sent, everyone's phone shows the original — and they all call them out. The pizza place only accepts the version that most phones agree on. That is a blockchain: a network where the majority decides what is real.",
      },
      {
        type: "quiz",
        emoji: "🧠",
        question: "What makes a blockchain different from a regular database?",
        options: [
          "It is stored on a single supercomputer",
          "It is shared across many computers and nobody can secretly change past entries",
          "It can only store cryptocurrency transactions",
          "It is owned by a central bank",
        ],
        correct: 1,
        feedback:
          "A blockchain is decentralized — no single person controls it, and past data is locked in by cryptography. That is what makes it trustless and secure.",
      },
      {
        type: "tips",
        emoji: "💡",
        title: "Things to Remember",
        items: [
          "Blockchain is NOT the same as Bitcoin. Bitcoin is one app on top of blockchain, like email is one app on top of the internet.",
          "Public blockchains let anyone read the data. They are transparent, not private.",
          "There are hundreds of blockchains — some fast, some secure, some energy-efficient. Each makes different trade-offs.",
          "Once data is written, changing it is nearly impossible. That is called immutability.",
        ],
      },
      {
        type: "quiz",
        emoji: "🎯",
        question: 'What does "immutable" mean in blockchain?',
        options: [
          "Data disappears after a week",
          "Data can be edited by anyone with a password",
          "Data cannot be changed once confirmed",
          "Data is stored on paper",
        ],
        correct: 2,
        feedback:
          "Immutability means nobody can alter or delete data once it is recorded. This is what makes blockchain an honest record keeper.",
      },
      {
        type: "fact",
        emoji: "🤯",
        title: "Mind-Blowing Fact",
        content:
          "The idea for blockchain was born in 1991 — eight years before Google existed! Scientists Stuart Haber and Scott Stornetta wanted to timestamp digital documents so nobody could backdate them. Their invention eventually became the foundation for Bitcoin and thousands of other projects. Sometimes the coolest tech starts as a solution to a boring problem.",
      },
      {
        type: "summary",
        emoji: "🎉",
        title: "You Made It!",
        content:
          "A blockchain is a shared, tamper-proof digital record book that lives on many computers at once. It is decentralized (nobody owns it), transparent (anyone can check it), and immutable (past data is locked in). This simple but powerful invention is the backbone of cryptocurrency, NFTs, supply chain tracking, digital identity, and much more.",
      },
    ],
  },

  "bitcoin-crypto": {
    id: "bitcoin-crypto",
    title: "Bitcoin & Cryptocurrency",
    blocks: [
      {
        type: "read",
        emoji: "💰",
        title: "Digital Money That Answers to Nobody",
        content:
          "Bitcoin is internet money with no bank, no government, and no boss. It was created in 2009 by someone — or a group — using the name Satoshi Nakamoto. Instead of a bank tracking who has what, thousands of computers around the world run the same software and keep each other honest. You can send Bitcoin to anyone on Earth for a tiny fee, and it arrives in minutes. No permission needed.",
      },
      {
        type: "example",
        emoji: "✈️",
        title: "Sending Money Home",
        content:
          "Maria works in Canada and wants to send 200 dollars to her mom in the Philippines. With a bank, the money passes through two banks, a wire service, a currency exchange... each taking fees and days. Her mom ends up with 187 dollars after a week. With Bitcoin: Maria opens her phone, scans her mom's address, types 200, hits send. Eleven minutes later, her mom has the full amount. Cost? A few cents. That is the promise of cryptocurrency.",
      },
      {
        type: "quiz",
        emoji: "🧠",
        question: "Who controls the Bitcoin network?",
        options: [
          "The United Nations",
          "Satoshi Nakamoto",
          "No single person — it is run by a global network of computers following the same rules",
          "The largest Bitcoin holders",
        ],
        correct: 2,
        feedback:
          "Nobody controls Bitcoin. It runs on software that thousands of independent computers execute. The rules are coded in and cannot be changed without overwhelming network agreement.",
      },
      {
        type: "tips",
        emoji: "💡",
        title: "Crypto 101 Reminders",
        items: [
          "You do NOT need to buy a whole Bitcoin. One Bitcoin is divisible into 100 million pieces called satoshis.",
          "Bitcoin is pseudonymous, not anonymous. All transactions are public — anyone can see them.",
          "There will only ever be 21 million Bitcoins. The supply is capped by code, not by a central bank deciding to print more.",
          "Not all crypto is Bitcoin. Ethereum, Solana, and thousands of others are completely different animals.",
        ],
      },
      {
        type: "quiz",
        emoji: "🎯",
        question: "What is a satoshi?",
        options: [
          "A type of blockchain",
          "The smallest unit of Bitcoin (0.00000001 BTC)",
          "A Bitcoin wallet brand",
          "A Japanese cryptocurrency exchange",
        ],
        correct: 1,
        feedback:
          "One satoshi is 0.00000001 Bitcoin — one hundred millionth of a coin. Even 10 dollars worth of Bitcoin is millions of satoshis.",
      },
      {
        type: "fact",
        emoji: "🤯",
        title: "The Pizza That Cost a Fortune",
        content:
          "On May 22, 2010, a programmer named Laszlo Hanyecz paid 10,000 Bitcoins for two pizzas. At the time, that was about 41 dollars. Today, those Bitcoins would be worth... let us just say he could buy the entire pizza chain. Every year, crypto fans celebrate Bitcoin Pizza Day to remind themselves how far the technology has come.",
      },
      {
        type: "summary",
        emoji: "🎉",
        title: "What You Learned",
        content:
          "Bitcoin was the first cryptocurrency: internet money that works without banks or governments. It is decentralized, limited in supply, and lets anyone send value anywhere in the world cheaply and quickly. Understanding Bitcoin gives you the foundation to understand all other cryptocurrencies.",
      },
    ],
  },

  "wallets-keys": {
    id: "wallets-keys",
    title: "Wallets and Private Keys",
    blocks: [
      {
        type: "read",
        emoji: "🔑",
        title: "Your Key to the Crypto Kingdom",
        content:
          "A crypto wallet does NOT hold your coins like a leather wallet holds cash. Your coins live on the blockchain forever. What your wallet holds is the secret key that proves you own those coins. Think of it like a magic wand that signs your name on transactions. Anyone holding that wand can move your coins. Lose it, and your coins are locked away forever — no help desk, no reset button, no bank manager to call.",
      },
      {
        type: "example",
        emoji: "🏦",
        title: "The Safety Deposit Box",
        content:
          "Imagine a giant vault with millions of safety deposit boxes. Each box has a glass front — anyone can see what is inside (that is the blockchain being transparent). Your box can only be opened with your personal key. You can make copies of that key, give one to a trusted friend, or hide it in a safe. But if you lose every copy, that box and everything inside it is gone forever. Nobody can break it open for you. That is how crypto wallets work.",
      },
      {
        type: "quiz",
        emoji: "🧠",
        question: "What does a crypto wallet actually store?",
        options: [
          "Your cryptocurrency coins",
          "Your private keys (the secret codes that prove ownership)",
          "Your transaction history",
          "Your Bitcoin mining equipment",
        ],
        correct: 1,
        feedback:
          "Your wallet stores private keys — secret alphanumeric codes that prove you own the coins on the blockchain. The coins themselves never leave the blockchain.",
      },
      {
        type: "tips",
        emoji: "💡",
        title: "Wallet Safety Rules",
        items: [
          "NEVER share your private key or seed phrase. Nobody legitimate will ever ask for them — not support, not an exchange, not a charity.",
          "Write your seed phrase on PAPER and store it somewhere safe. No screenshots, no cloud storage, no photos.",
          "Use hot wallets (apps on your phone) for small, everyday amounts. Use cold wallets (offline hardware devices) for serious savings.",
          "A 12-word seed phrase has more combinations than there are atoms in the universe. But if you lose it, those combinations do not help you.",
        ],
      },
      {
        type: "quiz",
        emoji: "🎯",
        question: 'What should you do with your seed phrase?',
        options: [
          "Store it in a password manager for convenience",
          "Write it on paper and keep it in a secure physical location",
          "Share it with a trusted friend in case you lose it",
          "Take a photo and store it in your email drafts",
        ],
        correct: 1,
        feedback:
          "Paper is best — offline is safe. Never put your seed phrase on any device connected to the internet. If a hacker gets it, your crypto is gone.",
      },
      {
        type: "fact",
        emoji: "🤯",
        title: "The Man Who Lost a Fortune",
        content:
          "A Welsh man named James Howells mined 7,500 Bitcoins in 2009 and stored them on a laptop. In 2013, he threw the laptop away during a cleanup. Today, that hard drive is buried in a landfill under tons of garbage, and those Bitcoins are worth over 700 million dollars. He has tried to get permission to dig up the landfill — so far, no luck. Always back up your wallet!",
      },
      {
        type: "summary",
        emoji: "🎉",
        title: "Lock It In",
        content:
          "Your crypto wallet is your identity in the blockchain world. It stores private keys, not coins. Guard your private keys and seed phrase like the most valuable thing you own — because if you lose them, your crypto is gone forever. Hot wallets for daily use, cold wallets for savings, and always keep that paper backup safe.",
      },
    ],
  },

  "transactions-gas": {
    id: "transactions-gas",
    title: "Transactions and Gas Fees",
    blocks: [
      {
        type: "read",
        emoji: "⛽",
        title: "Why Every Move Costs a Little",
        content:
          "Every time you do something on a blockchain — send coins, trade an NFT, play a game — you pay a small fee called gas. This fee goes to the people running the computers that process your transaction. Without gas, nobody would volunteer their computer to keep the network running. Think of it like paying a toll on a highway: a small price to use a well-maintained road.",
      },
      {
        type: "example",
        emoji: "🚗",
        title: "Rush Hour vs. Midnight",
        content:
          "Sending a transaction during a busy time is like driving through a city at 5 PM — traffic is bumper to bumper, and you have to pay more if you want to skip the line (priority fees). Send the same transaction at 3 AM, and the road is empty. Your fee drops by 90%. Smart users wait for quiet hours or use blockchains that never get congested.",
      },
      {
        type: "quiz",
        emoji: "🧠",
        question: "What determines how much gas a transaction costs?",
        options: [
          "The dollar amount you are sending",
          "How much computation the transaction needs plus how busy the network is",
          "Your wallet balance",
          "The time of day only",
        ],
        correct: 1,
        feedback:
          "Gas depends on two things: how complex your transaction is (simple send vs. smart contract call) and network congestion (how many others are trying to transact at the same time).",
      },
      {
        type: "tips",
        emoji: "💡",
        title: "Gas-Saving Pro Tips",
        items: [
          "Check gas prices before sending. Websites like Etherscan show real-time fees. If it is high, wait an hour.",
          "Complex transactions (like swapping tokens) cost more than simple sends. Batch actions when possible.",
          "Set your gas limit high enough. If you run out of gas mid-transaction, it fails but you still pay for the work done.",
          "Use Layer-2 networks like Arbitrum or Polygon for much cheaper fees — often less than a cent.",
        ],
      },
      {
        type: "quiz",
        emoji: "🎯",
        question: "What happens if you set your gas limit too low?",
        options: [
          "The transaction goes through but takes longer",
          "The transaction fails but you still pay for the work completed",
          "The transaction is free",
          "Your wallet gets penalized",
        ],
        correct: 1,
        feedback:
          "If your gas limit is too low, the transaction runs out of fuel partway through and fails. You pay for the computation that happened, but nothing gets executed. Always leave a safety margin.",
      },
      {
        type: "fact",
        emoji: "🤯",
        title: "The CryptoKitties Traffic Jam",
        content:
          "In 2017, a game called CryptoKitties let people breed and trade digital cats on Ethereum. It became so popular that it clogged the entire network for weeks. Some people paid more in gas fees than the actual kittens were worth — just to adopt a pixel cat! This chaos actually inspired developers to build faster, cheaper blockchains like Solana and Polygon.",
      },
      {
        type: "summary",
        emoji: "🎉",
        title: "You Are a Gas Pro Now",
        content:
          "Gas fees keep blockchain networks running by paying the computers that process transactions. They vary based on complexity and congestion. Simple sends are cheap; complex smart contract calls cost more. Check current prices before you transact, use Layer-2s for savings, and keep your gas limit reasonable. You are now ready to trade without overpaying.",
      },
    ],
  },

  "crypto-security": {
    id: "crypto-security",
    title: "Crypto Security and Scams",
    blocks: [
      {
        type: "read",
        emoji: "🛡️",
        title: "You Are Your Own Bank — And Your Own Security Guard",
        content:
          "In crypto, there is no fraud department to call. No 'undo' button. No bank manager who can reverse a transaction. That makes you the sole protector of your money. The good news? Scammers win through tricks, not through breaking the blockchain itself. Learn their tricks, and you become practically unhackable. Most crypto losses happen between the keyboard and the chair — not through code.",
      },
      {
        type: "example",
        emoji: "🎣",
        title: "The Fake Giveaway Trap",
        content:
          "A Twitter account that looks exactly like Elon Musk tweets: 'I am giving away 10,000 Bitcoin to the first 500 people who send 1 BTC to this address!' It has blue checkmark, thousands of followers (bots), and replies from fake accounts saying 'I got mine!' This is the most common crypto scam. Rule of thumb: if a stranger offers you free money, it is a trap. Every time.",
      },
      {
        type: "quiz",
        emoji: "🧠",
        question: "What is the #1 thing scammers use to steal crypto?",
        options: [
          "Breaking blockchain encryption",
          "Tricking you into sharing your private key or seed phrase",
          "Hacking the Bitcoin network",
          "Stealing your computer physically",
        ],
        correct: 1,
        feedback:
          "The blockchain itself has never been hacked. Scammers use social engineering — phishing emails, fake websites, impersonation — to trick YOU into handing over your keys. Never enter your seed phrase anywhere except your own wallet software.",
      },
      {
        type: "tips",
        emoji: "💡",
        title: "The Golden Security Rules",
        items: [
          "Your seed phrase is the master key to your crypto. NEVER type it into any website, app, or message. No exceptions.",
          "If someone DMs you first about crypto support, an investment opportunity, or a giveaway — it is a scam. Block and report.",
          "Always double-check wallet addresses. Copy-paste is safer than typing from memory. Send a tiny test amount first.",
          "Use a hardware wallet (like Ledger or Trezor) for anything worth more than a few hundred dollars. It keeps keys offline.",
        ],
      },
      {
        type: "quiz",
        emoji: "🎯",
        question: "How can you safely verify a website before connecting your wallet?",
        options: [
          "It looks professional, so it must be safe",
          "Check the URL carefully for misspellings and check community forums for warnings",
          "It was the first Google result",
          "A YouTuber recommended it",
        ],
        correct: 1,
        feedback:
          "Fake sites use URLs like 'opensea.io' (with a zero instead of 'o') or 'uniswAp.com'. Always check the URL bar. Cross-reference with official Twitter and Discord before connecting your wallet.",
      },
      {
        type: "fact",
        emoji: "🤯",
        title: "The $600 Million Mistake",
        content:
          "In 2022, a hacker exploited a vulnerability in a cross-chain bridge and stole over 600 million dollars. But here is the twist: the hacker was a security researcher who found the bug and meant to report it. Due to a quirk in how the smart contract was written, the 'withdraw' function triggered instantly before he could prove the exploit existed. He spent weeks trying to return the funds and eventually became a white-hat hacker hero. Even the pros make mistakes!",
      },
      {
        type: "summary",
        emoji: "🎉",
        title: "Stay Safe Out There",
        content:
          "Crypto security is about protecting yourself from tricks, not from technology. The blockchain is secure — humans are the weak link. Never share private keys, verify everything twice, use hardware wallets for large amounts, and stay skeptical of anything that sounds too good to be true. Follow these rules, and you will be safer than 99% of crypto users.",
      },
    ],
  },
};

export function getLesson(id) {
  return LESSONS[id] ?? null;
}

export function getAllLessons() {
  return Object.values(LESSONS);
}
