
import { useState } from "react";
import { SubscriptionExtensionRequest } from "@/types/subscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface PendingExtensionRequestsProps {
  requests: SubscriptionExtensionRequest[];
  onApprove: (requestId: string) => Promise<void>;
  onReject: (requestId: string, comment?: string) => Promise<void>;
  isLoading: boolean;
}

export function PendingExtensionRequests({ 
  requests,
  onApprove,
  onReject,
  isLoading
}: PendingExtensionRequestsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SubscriptionExtensionRequest | null>(null);
  const [rejectComment, setRejectComment] = useState("");
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(null);

  const pendingRequests = requests.filter(req => req.status === 'pending');

  if (pendingRequests.length === 0) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleApprove = async (requestId: string) => {
    setProcessingRequestId(requestId);
    try {
      await onApprove(requestId);
    } finally {
      setProcessingRequestId(null);
    }
  };

  const handleRejectClick = (request: SubscriptionExtensionRequest) => {
    setSelectedRequest(request);
    setRejectComment("");
    setIsDialogOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedRequest) return;
    
    setProcessingRequestId(selectedRequest.id);
    try {
      await onReject(selectedRequest.id, rejectComment || undefined);
      setIsDialogOpen(false);
    } finally {
      setProcessingRequestId(null);
    }
  };

  const getMonthWord = (months: number): string => {
    if (months === 1) return "месяц";
    if (months >= 2 && months <= 4) return "месяца";
    return "месяцев";
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-xl">
            <Badge variant="destructive" className="mr-2">Новые</Badge>
            Запросы на продление подписки
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map(request => (
              <div 
                key={request.id} 
                className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium">{request.clinicName}</p>
                  <p className="text-sm text-muted-foreground">
                    Запрос на {request.requestedMonths} {getMonthWord(request.requestedMonths)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Запрошено: {formatDate(request.requestedAt)}
                  </p>
                </div>
                <div className="flex gap-2 self-end md:self-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRejectClick(request)}
                    disabled={isLoading || processingRequestId === request.id}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Отклонить
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleApprove(request.id)}
                    disabled={isLoading || processingRequestId === request.id}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Подтвердить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Отклонить запрос</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите отклонить запрос на продление подписки от клиники {selectedRequest?.clinicName}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="comment" className="text-sm font-medium mb-2 block">
              Комментарий (опционально)
            </label>
            <Textarea
              id="comment"
              placeholder="Укажите причину отклонения..."
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleRejectConfirm}
              disabled={isLoading}
            >
              Отклонить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
