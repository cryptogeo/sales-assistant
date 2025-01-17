
export type ObjectionKey = 
  | "too expensive" 
  | "need to think about it" 
  | "send me an email" 
  | "have advisor"
  | "not interested"
  | "bad timing"
  | "no budget"
  | "need to consult"
  | "happy with current"
  | "send information"
  | "call me later"
  | "too small"
  | "too busy";

export const customResponses: Record<ObjectionKey, string[]> = {
  "too expensive": [
    "Let's focus on the value rather than the price. Our solution will save you X amount in the long run by...",
    "I understand budget is a concern. Would it help to break down the ROI for you?",
  ],
  "need to think about it": [
    "I appreciate you wanting to give this careful consideration. What specific aspects would you like to think about?",
    "To help you make an informed decision, what additional information would be helpful?",
  ],
  "send me an email": [
    "Sure, absolutely is it more details about the company or the ideas? – first it is key to be positive, not reacting with conflict...",
  ],
  "have advisor": [
    "I understand you have an advisor. Many of our clients initially had existing advisors too. What I've found is that successful people often benefit from multiple perspectives.",
  ],
  "not interested": [
    "I understand your initial reaction. Many of our best clients started with that same feeling. Could I ask what specifically makes you feel that way?",
    "That's fair. Would you be open to sharing what aspects of our solution don't align with your needs?",
  ],
  "bad timing": [
    "I understand timing is crucial. When would be a better time to revisit this conversation?",
    "Many companies find that waiting can actually increase costs/risks. What specific timing concerns do you have?",
  ],
  "no budget": [
    "I understand budget constraints. Let's discuss ROI and how this could potentially pay for itself.",
    "What if we could structure this in a way that works with your current budget cycle?",
  ],
  "need to consult": [
    "Of course, involving key stakeholders is important. Who else should be part of this conversation?",
    "That makes sense. What aspects do you think they'll be most interested in or concerned about?",
  ],
  "happy with current": [
    "That's great that you're satisfied. What aspects of your current solution work best for you?",
    "Would you be open to exploring how we might complement your current setup?",
  ],
  "send information": [
    "I'd be happy to share relevant information. What specific aspects would you like to learn more about?",
    "To ensure I send the most relevant materials, could you tell me what's most important to you?",
  ],
  "call me later": [
    "I respect your time. When would be the best time to reconnect?",
    "Before I call back, what specific information would be most valuable to have ready?",
  ],
  "too small": [
    "Size isn't always the key factor. We have solutions that scale with your business.",
    "Many of our most successful clients started small. What growth goals do you have?",
  ],
  "too busy": [
    "I understand you're busy. That's exactly why our solution could be valuable - it saves time by...",
    "When things are busy is often the best time to implement solutions that create efficiency. What's taking up most of your time right now?",
  ]
};