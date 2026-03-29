// export const calculateATSScore = (text) => {
//   text = text.toLowerCase();

//   let score = 0;

//   // 🎯 Skills (30%)
//   const skills = ["react", "node", "mongodb", "javascript", "python"];
//   let skillMatches = skills.filter(skill => text.includes(skill)).length;
//   score += (skillMatches / skills.length) * 30;

//   // 📂 Projects (25%)
//   if (text.includes("project")) score += 25;

//   // 💼 Experience (25%)
//   if (text.includes("experience") || text.includes("internship")) score += 25;

//   // 🔑 Keywords (10%)
//   const keywords = ["api", "frontend", "backend", "fullstack"];
//   let keywordMatches = keywords.filter(k => text.includes(k)).length;
//   score += (keywordMatches / keywords.length) * 10;

//   // 🧾 Formatting (10%)
//   if (text.length > 300) score += 10;

//   return Math.round(score);
// };


export const calculateATSScore = (text) => {
  text = text.toLowerCase();

  let score = 0;

  // 🎯 Skills (30%)
  const skills = ["react", "node", "mongodb", "javascript", "python"];
  let skillMatches = skills.filter(skill => text.includes(skill)).length;
  score += (skillMatches / skills.length) * 30;

  // 📂 Projects (25%)
  if (text.includes("project")) score += 25;

  // 💼 Experience (25%)
  if (text.includes("experience") || text.includes("internship")) score += 25;

  // 🔑 Keywords (10%)
  const keywords = ["api", "frontend", "backend", "fullstack"];
  let keywordMatches = keywords.filter(k => text.includes(k)).length;
  score += (keywordMatches / keywords.length) * 10;

  // 🧾 Formatting (10%)
  if (text.length > 300) score += 10;

  return Math.round(score);
};