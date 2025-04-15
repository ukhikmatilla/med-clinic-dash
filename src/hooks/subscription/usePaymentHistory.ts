
import { useState } from 'react';
import { PaymentHistory, InvoiceFormData } from '@/types/subscription';

export function usePaymentHistory(initialPayments: PaymentHistory[]) {
  const [payments, setPayments] = useState<PaymentHistory[]>(initialPayments);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для добавления новой оплаты в историю
  const addPayment = (newPayment: PaymentHistory) => {
    setPayments([newPayment, ...payments]);
  };

  // Функция для генерации счета
  const generateInvoice = async (invoiceData: InvoiceFormData, clinicInfo: { clinicId: string, clinicName: string }): Promise<void> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Форматирование суммы
    const formattedAmount = `${invoiceData.price.toLocaleString('ru-RU')} сум`;
    
    // Создаем новую запись в истории платежей для выставленного счета
    const newInvoice: PaymentHistory = {
      id: `inv_${payments.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      amount: formattedAmount,
      planName: invoiceData.tariff,
      status: "awaiting",
      invoiceGenerated: true,
      clinicId: clinicInfo.clinicId,
      clinicName: clinicInfo.clinicName,
      source: "manual"
    };
    
    setPayments([newInvoice, ...payments]);
    
    // Имитация отправки в Telegram
    if (invoiceData.sendToTelegram) {
      console.log("Отправка счета в Telegram администратору клиники", {
        clinicId: clinicInfo.clinicId,
        amount: formattedAmount,
        period: `${invoiceData.period.from.toLocaleDateString('ru-RU')} - ${invoiceData.period.to.toLocaleDateString('ru-RU')}`,
        tariff: invoiceData.tariff
      });
    }
    
    setIsLoading(false);
  };

  return {
    payments,
    isLoading,
    addPayment,
    generateInvoice
  };
}
