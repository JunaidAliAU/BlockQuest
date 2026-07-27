export const GAMES = [
  {
    id: "match-terms",
    title: "Match the Terms",
    description: "Pair blockchain terms with their correct definitions.",
    emoji: "🧩",
    gradient: "from-primary-600 to-accent-600",
    xpReward: 200,
    totalItems: 8,
  },
  {
    id: "arrange-steps",
    title: "Arrange the Steps",
    description: "Put blockchain transaction steps in the right order.",
    emoji: "📋",
    gradient: "from-accent-600 to-primary-600",
    xpReward: 200,
    totalItems: 6,
  },
  {
    id: "scam-or-safe",
    title: "Scam or Safe",
    description: "Spot crypto scams by classifying real-world messages.",
    emoji: "🛡️",
    gradient: "from-amber-600 to-primary-600",
    xpReward: 200,
    totalItems: 10,
  },
];

export const MATCH_PAIRS = [
  { term: "Blockchain", definition: "A shared, tamper-proof digital record book stored across many computers." },
  { term: "Smart Contract", definition: "Self-executing code on the blockchain that runs when conditions are met." },
  { term: "Gas Fee", definition: "A payment to network validators for processing a transaction." },
  { term: "Private Key", definition: "A secret code that proves ownership of cryptocurrency and signs transactions." },
  { term: "Seed Phrase", definition: "A 12- or 24-word backup that can restore a wallet's private keys." },
  { term: "DeFi", definition: "Financial services built on blockchain that operate without traditional banks." },
  { term: "Consensus", definition: "The process by which network participants agree on the state of the blockchain." },
  { term: "dApp", definition: "A decentralized application that runs on a blockchain network." },
];

export const TRANSACTION_STEPS = [
  { id: "create", label: "Create a transaction in your wallet (send, swap, or interact with a contract)", order: 0 },
  { id: "sign", label: "Sign the transaction with your private key to prove authorization", order: 1 },
  { id: "broadcast", label: "Broadcast the signed transaction to the blockchain network", order: 2 },
  { id: "mempool", label: "Transaction enters the mempool (waiting area) until a validator picks it up", order: 3 },
  { id: "validate", label: "A validator includes the transaction in a new block and validates it", order: 4 },
  { id: "confirm", label: "The block is added to the chain and the transaction is confirmed", order: 5 },
];

export const SCAM_SCENARIOS = [
  {
    text: '"Congratulations! You won 10 Bitcoin! Click here to claim your prize by entering your wallet seed phrase."',
    isScam: true,
    explanation: "Legitimate giveaways never ask for your seed phrase. This is a classic phishing scam.",
  },
  {
    text: '"Hello, I am from Exchange Support. We detected suspicious activity on your account. Please verify your identity by providing your private key."',
    isScam: true,
    explanation: "No legitimate support team will ever ask for your private key. This is social engineering.",
  },
  {
    text: '"Send 1 ETH to this address and we will send 2 ETH back! Limited time offer! 🚀"',
    isScam: true,
    explanation: "If someone promises to double your money, it is always a scam. There are no guarantees in crypto.",
  },
  {
    text: '"I am a verified project admin. Join our Telegram group for an exclusive pre-sale. Send ETH to the address in the pinned message."',
    isScam: true,
    explanation: "Scammers often impersonate project admins in Telegram and Discord. Always verify through official channels.",
  },
  {
    text: '"You have been selected for an airdrop! Connect your wallet to this link to claim your free tokens."',
    isScam: true,
    explanation: "Fake airdrops trick you into connecting your wallet to malicious sites that drain your funds.",
  },
  {
    text: '"We are launching a new DeFi protocol. Our smart contract has been audited by three firms. Whitepaper and GitHub are available."',
    isScam: false,
    explanation: "Legitimate projects share audited contracts, public whitepapers, and open-source code. Do your own research to verify.",
  },
  {
    text: '"This NFT collection has a verified blue checkmark on OpenSea. The team is doxxed and active on Twitter and Discord."',
    isScam: false,
    explanation: "Verified collections on major marketplaces with public-facing teams are generally legitimate. Still, always research before buying.",
  },
  {
    text: '"Hardware wallets keep your private keys offline. I recommend using a Ledger or Trezor for long-term storage."',
    isScam: false,
    explanation: "Hardware wallets are a legitimate security recommendation. They store private keys offline, protecting them from online threats.",
  },
  {
    text: '"I accidentally sent 500 USDT to the wrong address. Can you send it back? I will reward you with 20%."',
    isScam: true,
    explanation: "The address was likely spoofed. Do not send anything back. The initial transfer may be from a stolen or fake contract.",
  },
  {
    text: '"Our DeFi platform lets you stake tokens and earn 2% daily returns. Refer friends for bonus rewards!"',
    isScam: true,
    explanation: "A 2% daily return (730% annually) is mathematically unsustainable and a hallmark of Ponzi schemes.",
  },
];
