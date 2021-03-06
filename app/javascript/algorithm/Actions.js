const ACTIONS = [
  {
    "name": "None",
    "description": "There are some quieter days during the startup journey. You might have different energy in each of " +
      "those. Ranging from \"feeling one day closer to success\" to \"feeling that things are not going as expected\". " +
      "...Or most likely, it is \"just another day in the startup world\".",
    "values": [
      { "score": -10, "msg": "Feeling that things don't go as fast as expected..." },
      { "score": -10, "msg": "Feeling that things don't go as fast as expected..." },
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
    "name": "Advisor",
    "description": "In the startup world, some individuals present themselves as \"advisors\" while, in reality, many " +
      "are simply trying to sell you their services, or trying to take equity for nothing in return. Be careful, " +
      "useful advisors are very limited. Pick them wisely.",
    "values": [
      { "score": -150, "msg": "The 'advisor' turned out to be a liar, had no idea but now has a lot of shares" },
      { "score": -100, "msg": "The 'advisor' had no idea, gave bad advice and the company suffered" },
      { "score": -60, "msg": "After letting him/her join, you realized the 'advisor' won't really help" },
      { "score": -60, "msg": "After letting him/her join, you realized the 'advisor' won't really help" },
      { "score": -40, "msg": "Turned out the 'advisor' just wanted to sell his/her services" },
      { "score": -40, "msg": "Turned out the 'advisor' just wanted to sell his/her services" },
      { "score": -40, "msg": "Turned out the 'advisor' just wanted to sell his/her services" },
      { "score": 20, "msg": "The 'advisor' actually knows the market and may be helpful" },
      { "score": 50, "msg": "The 'advisor' is well connected to investors" },
      { "score": 100, "msg": "The 'advisor' is well connected in the market and will bring important customers" },
    ],
  },
  {
    "name": "Circus",
    "description": "In the last decade, tons of \"startup events\" have emerged. Unfortunately, most of them have " +
      "become some sort of \"circuses\", in which entrepreneurs are the clowns. A few may be useful, but in many " +
      "them you will be wasting your time. Choose carefully.",
    "values": [
      { "score": -60, "msg": "The event wasn't related to your business; you wasted a lot of time and some money" },
      { "score": -60, "msg": "The event wasn't related to your business; you wasted a lot of time and some money" },
      { "score": -50, "msg": "You didn't learn anything nor built useful connections; should have been working instead" },
      { "score": -50, "msg": "You didn't learn anything nor built useful connections; should have been working instead" },
      { "score": -30, "msg": "Nothing relevant happened, most likely you wasted your time" },
      { "score": -20, "msg": "Although not useful, the event wasn't long. Just wasted some time. Could have been worse" },
      { "score": -20, "msg": "You met a few people at the event, but not really useful connections" },
      { "score": 20, "msg": "Maybe someone you met at today's event might help you in future" },
      { "score": 50, "msg": "You built useful connections today (either partners or potential investors)" },
      { "score": 70, "msg": "Great event! You built very useful connections (someone relevant or well connected)" },
    ]
  },
  {
    "name": "Team",
    "description": "A new team member joined. Finding the right people for your startup is an extremely difficult " +
      "task. However, on-boarding valuable teammates is worth the effort, since building a great team is key to success.",
    "values": [
      { "score": -150, "msg": "Your co-founder (with 50% of shares) turned out to be a troublemaker" },
      { "score": -30, "msg": "The new team member has just left college and is inexperienced" },
      { "score": -20, "msg": "Another person with the same profile joined" },
      { "score": 20, "msg": "A new (average) employee joined the company" },
      { "score": 20, "msg": "A new (average) employee joined the company" },
      { "score": 20, "msg": "A new (average) employee joined the company" },
      { "score": 50, "msg": "A talented employee joined the company" },
      { "score": 50, "msg": "A talented employee joined the company" },
      { "score": 70, "msg": "A talented employee with startup experience joined the company" },
      { "score": 70, "msg": "A talented individual with startup experience and connections in the market joined!" },
    ]
  },
  {
    "name": "Product",
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
      { "score": 40, "msg": "You released new features based on your customer discovery efforts" },
      { "score": 40, "msg": "You released new features after listening to customer feedback!" },
      { "score": 40, "msg": "You released new features after listening to customer feedback!" },
      { "score": 50, "msg": "Your team embraced Agile Software Development. Delivery now focuses on value and there is " +
                            "better alignment across teams" },
    ]
  },
  {
    "name": "Feedback",
    "description": "Once you start receiving feedback from real customers, you typically feel astonished. Many use " +
      "your product in unexpected ways, weird bugs appear; some users request new features, new possible business models " +
      "emerge... But don't worry. This means you are moving forward. Now you know more about what the market really needs!",
    "values": [
      { "score": 20, "msg": "You included polls in your product" },
      { "score": 20, "msg": "You learned by reading customer feedback (emails and comments)" },
      { "score": 20, "msg": "You learned by reading customer feedback (emails and comments)" },
      { "score": 30, "msg": "You conducted one usability test with a friend" },
      { "score": 30, "msg": "You conducted one usability test with a relative" },
      { "score": 40, "msg": "You conducted a usability test with a potential customer" },
      { "score": 50, "msg": "You pivoted your pricing model after interviewing several potential customers" },
      { "score": 60, "msg": "You are now tracking user events and reviewing analytics, to improve user experience" },
      { "score": 60, "msg": "By measuring and experimenting, you have improved your conversion funnel" },
      { "score": 80, "msg": "You conducted an A/B test to know which of two design versions works best" },
    ]
  },
  {
    "name": "Investor",
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
    "name": "Doubts",
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
    "name": "Sales",
    "description": "The single most important thing you should be doing as an entrepreneur: selling. It's the only " +
      "real way to test your product/market fit. And it is definitely the best way to get the fuel (money) you need to " +
      "keep going... It is always better to get money from customers than from investors.",
    "values": [
      { "score": 70, "msg": "A small customer (or small number of customers) bought the product" },
      { "score": 70, "msg": "A small customer (or small number of customers) bought the product" },
      { "score": 70, "msg": "A small customer (or small number of customers) bought the product" },
      { "score": 70, "msg": "A small customer (or small number of customers) bought the product" },
      { "score": 70, "msg": "A small customer (or small number of customers) bought the product" },
      { "score": 70, "msg": "A small customer (or small number of customers) bought the product" },
      { "score": 70, "msg": "A small customer (or small number of customers) bought the product" },
      { "score": 150, "msg": "A medium-sized customer (or number of customers) bought the product" },
      { "score": 150, "msg": "A medium-sized customer (or number of customers) bought the product" },
      { "score": 250, "msg": "A big customer (or big number of customers) bought the product!" },
    ]
  },
  {
    "name": "Bad news",
    "description": "Sadly, as an entrepreneur you will receive bad news often. Many of your ideas will fail, " +
      "customers will churn, valuable team members may leave... You may run out of money, your relationships may " +
      "suffer... Bad news are learning opportunities, but I hope you receive as few as necessary.",
    "values": [
      { "score": -150, "msg": "Very bad news. Your startup is almost bankrupt" },
      { "score": -100, "msg": "Quite worrying news. We are running out of cash" },
      { "score": -50, "msg": "A key team member left" },
      { "score": -50, "msg": "A key team member left" },
      { "score": -50, "msg": "You are selling much less than expected" },
      { "score": -50, "msg": "You are selling much less than expected" },
      { "score": -35, "msg": "You are selling less than expected" },
      { "score": -35, "msg": "You are experiencing burnout" },
      { "score": -20, "msg": "You are finding it hard to close a new funding round" },
      { "score": -10, "msg": "You need to hire more people, but have no money to invest" },
    ]
  }
]

export default ACTIONS