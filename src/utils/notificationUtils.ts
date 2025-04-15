
/**
 * Sends a notification to Telegram
 * Note: This is a mock implementation. In a real application, this would call
 * an API endpoint connected to the Telegram Bot API
 */
export const sendTelegramNotification = async (message: string, chatId?: string): Promise<boolean> => {
  console.log(`[Telegram Notification] To: ${chatId || 'Super Admin'}, Message: ${message}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return true;
};

/**
 * Format a notification message for a subscription extension request
 */
export const formatExtensionRequestMessage = (clinicName: string, months: number): string => {
  const monthWord = getMonthWord(months);
  return `🔔 Новый запрос на продление подписки!\n\nКлиника: ${clinicName}\nПериод: ${months} ${monthWord}`;
};

/**
 * Returns the correct Russian word form for months
 */
export const getMonthWord = (months: number): string => {
  if (months === 1) return "месяц";
  if (months >= 2 && months <= 4) return "месяца";
  return "месяцев";
};
