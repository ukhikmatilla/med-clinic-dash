
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
 * Format a notification message for a plan change request
 */
export const formatPlanChangeRequestMessage = (clinicName: string, currentPlan: string, requestedPlan: string): string => {
  return `🔔 Новый запрос на смену тарифа!\n\nКлиника: ${clinicName}\nТекущий тариф: ${currentPlan}\nЗапрошенный тариф: ${requestedPlan}`;
};

/**
 * Format a notification message for approved plan change
 */
export const formatPlanChangeApprovedMessage = (clinicName: string, newPlan: string): string => {
  return `✅ Запрос на смену тарифа одобрен!\n\nКлиника: ${clinicName}\nНовый тариф: ${newPlan}`;
};

/**
 * Format a notification message for rejected plan change
 */
export const formatPlanChangeRejectedMessage = (clinicName: string, requestedPlan: string, comment?: string): string => {
  let message = `❌ Запрос на смену тарифа отклонен!\n\nКлиника: ${clinicName}\nЗапрошенный тариф: ${requestedPlan}`;
  
  if (comment) {
    message += `\nКомментарий: ${comment}`;
  }
  
  return message;
};

/**
 * Returns the correct Russian word form for months
 */
export const getMonthWord = (months: number): string => {
  if (months === 1) return "месяц";
  if (months >= 2 && months <= 4) return "месяца";
  return "месяцев";
};
