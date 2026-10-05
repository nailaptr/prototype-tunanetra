export function sanitizeResponse(text: string): string {
  // Remove markdown formatting but keep the textual content
  let sanitized = text.replace(/[*_~`#]+/g, "");
  
  // Remove markdown links but keep the text
  sanitized = sanitized.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove emojis using unicode ranges
  sanitized = sanitized.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "");

  // Normalize multiple spaces and line breaks (keep line breaks for numbering)
  sanitized = sanitized.split('\n').map(line => line.replace(/\s+/g, " ").trim()).join('\n');
  
  // Clean up empty lines
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n');

  return sanitized.trim();
}
