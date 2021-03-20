const ACTIONS = [
  {
    "name": "none",
    "values": [
      { "score": -1, "msg": "Feeling that things don't go as fast as expeceted..." },
      { "score": -1, "msg": "Feeling that things don't go as fast as expeceted..." },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 0, "msg": "Just one more day in the startup world!" },
      { "score": 1, "msg": "One day closer to success!" },
      { "score": 1, "msg": "One day closer to success!" },
    ],
  },
  {
    "name": "advisor",
    "values": [
      { "score": -15, "msg": "The 'advisor' turned out to be a liar, had no idea but took big shares" },
      { "score": -10, "msg": "The 'advisor' had no idea, gave wrong advice and company suffered" },
      { "score": -6, "msg": "You realized the 'advisor' won't help at all" },
      { "score": -6, "msg": "You realized the 'advisor' won't help at all" },
      { "score": -4, "msg": "The 'advisor' just wanted to sell his/her services" },
      { "score": -4, "msg": "The 'advisor' just wanted to sell his/her services" },
      { "score": -4, "msg": "The 'advisor' just wanted to sell his/her services" },
      { "score": 2, "msg": "The 'advisor' knows about the market and may be helful" },
      { "score": 5, "msg": "The 'advisor' is connected to investors in the field" },
      { "score": 10, "msg": "The 'advisor' will bring important customers" },
    ],
  },
  {
    "name": "circus",
    "values": [
      { "score": -5, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -5, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -5, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -5, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -5, "msg": "You should have been working instead; you wasted a lot of time" },
      { "score": -2, "msg": "You just wasted some time going there, not that bad" },
      { "score": -2, "msg": "You just wasted some time going there, not that bad" },
      { "score": 2, "msg": "Maybe someone you met today will help you in future" },
      { "score": 5, "msg": "You built useful connections (either partners or potential investors)" },
      { "score": 7, "msg": "You built very useful connections (someone relevant or well connected)" },
    ]
  },
  {
    "name": "team",
    "values": [
      { "score": -15, "msg": "You picked a troublemaker as founder and gave him/her 50% of shares" },
      { "score": -3, "msg": "The new team member has just left college and is inexperienced" },
      { "score": -2, "msg": "Another person with the same profile joined" },
      { "score": 2, "msg": "Average employee joined the company" },
      { "score": 2, "msg": "Average employee joined the company" },
      { "score": 2, "msg": "Average employee joined the company" },
      { "score": 5, "msg": "Talented employee joined the company" },
      { "score": 5, "msg": "Talented employee joined the company" },
      { "score": 7, "msg": "Talented employee with startup experience joined the company" },
      { "score": 7, "msg": "Talented person with startup experience and connections in the field joined as co-founder" },
    ]
  },
  {
    "name": "product",
    "values": [
      { "score": -3, "msg": "You invested too much (time and money) in your MVP" },
      { "score": 3, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 3, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 3, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 3, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 3, "msg": "You released an MVP or a very small increment to test the market!" },
      { "score": 4, "msg": "You released new features after listening to customer feedback and testing the market!" },
      { "score": 4, "msg": "You released new features after listening to customer feedback and testing the market!" },
      { "score": 4, "msg": "You released new features after listening to customer feedback and testing the market!" },
      { "score": 5, "msg": "You embraced Agile Software Development: product delivery is optimized and work environment improved significantly" },
    ]
  },
  {
    "name": "feedback",
    "values": [
      { "score": 1, "msg": "You included polls in your product" },
      { "score": 2, "msg": "You learned by read customer emails and comments" },
      { "score": 2, "msg": "You learned by read customer emails and comments" },
      { "score": 3, "msg": "You conducted one usability test with a friend" },
      { "score": 3, "msg": "You conducted one usability test with a friend" },
      { "score": 5, "msg": "You interviewed a potential customer" },
      { "score": 5, "msg": "You interviewed a potential customer" },
      { "score": 6, "msg": "You are tracking user events and reviewing analytics" },
      { "score": 6, "msg": "You are tracking user events and reviewing analytics" },
      { "score": 8, "msg": "You conducted an A/B test to know which of two design versions works best" },
    ]
  },
  {
    "name": "investor",
    "values": [
      { "score": 2, "msg": "You received funding from FFF" },
      { "score": 3, "msg": "An investor with no tech experience nor startup experience joined" },
      { "score": 3, "msg": "An investor with no tech experience nor startup experience joined" },
      { "score": 5, "msg": "An investor with tech experience but no startup experience joined" },
      { "score": 7, "msg": "An investor with startup experience (in other markets) joined" },
      { "score": 7, "msg": "An investor with startup experience (in other markets) joined" },
      { "score": 10, "msg": "An investor with startup experience in your market joined" },
      { "score": 10, "msg": "An investor with startup experience in your market joined" },
      { "score": 15, "msg": "An investor with startup experience and contacts in your market joined, bringing along some customers" },
      { "score": 15, "msg": "An investor with startup experience and contacts in your market joined, bringing along some customers" },
    ]
  },
  {
    "name": "doubts",
    "values": [
      { "score": -2, "msg": "You have doubts and feel lost" },
      { "score": -1, "msg": "You have doubts and feel lost" },
      { "score": -1, "msg": "You have doubts and feel lost" },
      { "score": -1, "msg": "You have doubts and feel lost" },
      { "score": -1, "msg": "You have doubts and feel lost" },
      { "score": -1, "msg": "You have doubts and feel lost" },
      { "score": 1, "msg": "You have doubts, but that motivates you to try new things" },
      { "score": 1, "msg": "You have doubts, but that motivates you to try new things" },
      { "score": 1, "msg": "You have doubts, but that motivates you to try new things" },
      { "score": 2, "msg": "You have doubts, but that motivates you to try new things" },
    ]
  },
  {
    "name": "sales",
    "values": [
      { "score": 7, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 7, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 7, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 7, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 7, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 7, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 7, "msg": "Sold the product to a small customer (or small group)" },
      { "score": 15, "msg": "Sold the product to a medium-size customer (or medium-size group)" },
      { "score": 15, "msg": "Sold the product to a medium-size customer (or medium-size group)" },
      { "score": 25, "msg": "Sold the product to a big customer (or big group)" },
    ]
  },
  {
    "name": "badnews",
    "values": [
      { "score": -15, "msg": "Bad news..." },
      { "score": -10, "msg": "Bad news..." },
      { "score": -5, "msg": "Bad news..." },
      { "score": -5, "msg": "Bad news..." },
      { "score": -5, "msg": "Bad news..." },
      { "score": -5, "msg": "Bad news..." },
      { "score": -5, "msg": "Bad news..." },
      { "score": -2, "msg": "Bad news..." },
      { "score": -2, "msg": "Bad news..." },
      { "score": -1, "msg": "Bad news..." },
    ]
  }
]

export default ACTIONS