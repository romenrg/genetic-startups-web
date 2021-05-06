const ACTIONS = [
  {
    "name": "none",
    "description": "There are some quieter days during the startup journey. You might have different energy in each of " +
      "those. Ranging from \"feeling one day closer to success\" to \"feeling that things are not going as expected\". " +
      "...Or most likely, it is \"just another day in the startup world\".",
    "values": [
      { "score": -10, "msg": "Feeling that things don't go as fast as expeceted..." },
      { "score": -10, "msg": "Feeling that things don't go as fast as expeceted..." },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 10, "msg": "One day closer to success!" },
      { "score": 10, "msg": "One day closer to success!" },
    ],
  },
  {
    "name": "advisor",
    "description": "In the startup world, some individuals present themselves as \"advisors\" while, in reality, many " +
      "are simply trying to sell you their services, or trying to take equity for nothing in return. Be careful, " +
      "useful advisors are very limited. Pick them wisely.",
    "values": [
      { "score": -150, "msg": "The 'advisor' turned out to be a liar, had no idea but took big shares" },
      { "score": -100, "msg": "The 'advisor' had no idea, gave wrong advice and company suffered" },
      { "score": -60, "msg": "You realized the 'advisor' won't help at all" },
      { "score": -60, "msg": "You realized the 'advisor' won't help at all" },
      { "score": -40, "msg": "The 'advisor' just wanted to sell his/her services" },
      { "score": -40, "msg": "The 'advisor' just wanted to sell his/her services" },
      { "score": -40, "msg": "The 'advisor' just wanted to sell his/her services" },
      { "score": 20, "msg": "The 'advisor' knows about the market and may be helful" },
      { "score": 50, "msg": "The 'advisor' is connected to investors in the field" },
      { "score": 100, "msg": "The 'advisor' will bring important customers" },
    ],
  },
  {
    "name": "circus",
    "description": "In the last decade, tons of \"startup events\" have emerged. Unfortunately, most of them have " +
      "become some sort of \"circuses\", in which entrepreneurs are the clowns. A few may be useful, but in many " +
      "them you will be wasting your time. Choose carefully.",
    "values": [
      { "score": -50, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -50, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -50, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -50, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -50, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -20, "msg": "You just wasted some time going there, not that bad" },
      { "score": -20, "msg": "You just wasted some time going there, not that bad" },
      { "score": 20, "msg": "Maybe someone you met today will help you in future" },
      { "score": 50, "msg": "You built useful connections (either partners or potential investors)" },
      { "score": 70, "msg": "You built very useful connections (someone relevant or well connected)" },
    ]
  },
  {
    "name": "team",
    "description": "A new team member joined. Finding the right people for your startup is an extremely difficult " +
      "task. However, on-boarding valuable teammates is worth the effort, since building a great team is key to success.",
    "values": [
      { "score": -150, "msg": "You picked a troublemaker as founder and gave him/her 50% of shares" },
      { "score": -30, "msg": "The new team member has just left college and is inexperienced" },
      { "score": -20, "msg": "Another person with the same profile joined" },
      { "score": 20, "msg": "Average employee joined the company" },
      { "score": 20, "msg": "Average employee joined the company" },
      { "score": 20, "msg": "Average employee joined the company" },
      { "score": 50, "msg": "Talented employee joined the company" },
      { "score": 50, "msg": "Talented employee joined the company" },
      { "score": 70, "msg": "Talented employee with startup experience joined the company" },
      { "score": 70, "msg": "Talented person with startup experience and connections in the field joined as co-founder" },
    ]
  },
  {
    "name": "product",
    "description": "When you release your MVP (or a new feature), you often feel like a fool; since, in most cases, " +
      "it doesn't go as planned. But relax, learning from the market is key. The sooner you release your MVP (or " +
      "new features), the sooner you'll collect feedback that will let you learn and adapt to the real needs.",
    "values": [
      { "score": -30, "msg": "You invested too much (time and money) in your MVP" },
      { "score": 30, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 30, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 30, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 30, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 30, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 40, "msg": "You released new features after listening to customer feedback and testing the market!" },
      { "score": 40, "msg": "You released new features after listening to customer feedback and testing the market!" },
      { "score": 40, "msg": "You released new features after listening to customer feedback and testing the market!" },
      { "score": 50, "msg": "You embraced Agile Software Development: product delivery is optimized and work environment improved significantly" },
    ]
  },
  {
    "name": "feedback",
    "description": "Once you start receiving feedback from real customers, you typically feel astonished. Many use " +
      "your product in unexpected ways, weird bugs appear; some users request new features, new possible business models " +
      "emerge... But don't worry. This means you are moving forward. Now you know more about what the market really needs!",
    "values": [
      { "score": 10, "msg": "You included polls in your product" },
      { "score": 20, "msg": "You learned by read customer emails and comments" },
      { "score": 20, "msg": "You learned by read customer emails and comments" },
      { "score": 30, "msg": "You conducted one usability test with a friend" },
      { "score": 30, "msg": "You conducted one usability test with a friend" },
      { "score": 50, "msg": "You interviewed a potential customer" },
      { "score": 50, "msg": "You interviewed a potential customer" },
      { "score": 60, "msg": "You are tracking user events and reviewing analytics" },
      { "score": 60, "msg": "You are tracking user events and reviewing analytics" },
      { "score": 80, "msg": "You conducted an A/B test to know which of two design versions works best" },
    ]
  },
  {
    "name": "investor",
    "description": "Most startups are always in need of cash. Marketing actions typically require a lot of money, as " +
      "well as developing your product and pivoting. Investors can be your allies at this point.",
    "values": [
      { "score": 20, "msg": "You received funding from FFF investors" },
      { "score": 30, "msg": "An investor with no tech experience nor startup experience joined" },
      { "score": 30, "msg": "An investor with no tech experience nor startup experience joined" },
      { "score": 50, "msg": "An investor with tech experience but no startup experience joined" },
      { "score": 70, "msg": "An investor with startup experience (in other markets) joined" },
      { "score": 70, "msg": "An investor with startup experience (in other markets) joined" },
      { "score": 100, "msg": "An investor with startup experience in your market joined" },
      { "score": 100, "msg": "An investor with startup experience in your market joined" },
      { "score": 150, "msg": "An investor with startup experience and contacts in your market joined, bringing along some customers" },
      { "score": 150, "msg": "An investor with startup experience and contacts in your market joined, bringing along some customers" },
    ]
  },
  {
    "name": "doubts",
    "description": "During your entrepreneurial journey, many days you feel lost. Sometimes you don't know which way " +
      "to go, who to hire, which feature to build, how to increase sales,...",
    "values": [
      { "score": -20, "msg": "You have doubts and feel lost" },
      { "score": -10, "msg": "You have doubts and feel lost" },
      { "score": -10, "msg": "You have doubts and feel lost" },
      { "score": -10, "msg": "You have doubts and feel lost" },
      { "score": -10, "msg": "You have doubts and feel lost" },
      { "score": -10, "msg": "You have doubts and feel lost" },
      { "score": 10, "msg": "You have doubts, but that motivates you to try new things" },
      { "score": 10, "msg": "You have doubts, but that motivates you to try new things" },
      { "score": 10, "msg": "You have doubts, but that motivates you to try new things" },
      { "score": 20, "msg": "You have doubts, but that motivates you to try new things" },
    ]
  },
  {
    "name": "sales",
    "description": "The single most important thing you should be doing as an entrepreneur: selling. It's the only " +
      "real way to test your product/market fit. And it is definitely the best way to get the fuel (money) you need to " +
      "keep going... It is always better to get money from customers than from investors.",
    "values": [
      { "score": 70, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 70, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 70, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 70, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 70, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 70, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 70, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 150, "msg": "Sold the product to a medium-size customer (or medium-size group)" },
      { "score": 150, "msg": "Sold the product to a medium-size customer (or medium-size group)" },
      { "score": 250, "msg": "Sold the product to a big customer (or big group)" },
    ]
  },
  {
    "name": "badnews",
    "description": "Sadly, as an entrepreneur you will receive bad news often. Many of your ideas will fail, " +
      "customers will churn, valuable team members may leave... You may run out of money, your relationships may " +
      "suffer... Bad news are learning opportunities, but I hope you receive as few as necessary.",
    "values": [
      { "score": -150, "msg": "Bad news..." },
      { "score": -100, "msg": "Bad news..." },
      { "score": -50, "msg": "Bad news..." },
      { "score": -50, "msg": "Bad news..." },
      { "score": -50, "msg": "Bad news..." },
      { "score": -50, "msg": "Bad news..." },
      { "score": -50, "msg": "Bad news..." },
      { "score": -20, "msg": "Bad news..." },
      { "score": -20, "msg": "Bad news..." },
      { "score": -10, "msg": "Bad news..." },
    ]
  }
]

export default ACTIONS