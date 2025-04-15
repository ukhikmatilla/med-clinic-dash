
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock, MoreHorizontal } from "lucide-react";
import { PlanChangeRequest } from "@/types/subscription";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface PlanChangeRequestsProps {
  requests: PlanChangeRequest[];
  onApprove: (requestId: string) => Promise<void>;
  onReject: (requestId: string, comment?: string) => Promise<void>;
  isLoading: boolean;
}

export function PlanChangeRequests({ 
  requests, 
  onApprove, 
  onReject, 
  isLoading 
}: PlanChangeRequestsProps) {
  const [selectedRequest, setSelectedRequest] = useState<PlanChangeRequest | null>(null);
  const [dialogMode, setDialogMode] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState("");
  
  // Filter only pending requests
  const pendingRequests = requests.filter(req => req.status === 'pending');
  
  if (pendingRequests.length === 0) {
    return null;
  }
  
  const handleApprove = async () => {
    if (!selectedRequest) return;
    
    try {
      await onApprove(selectedRequest.id);
      setSelectedRequest(null);
      setDialogMode(null);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };
  
  const handleReject = async () => {
    if (!selectedRequest) return;
    
    try {
      await onReject(selectedRequest.id, comment);
      setSelectedRequest(null);
      setDialogMode(null);
      setComment("");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };
  
  const formatTime = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      return formatDistanceToNow(date, { addSuffix: true, locale: ru });
    } catch (error) {
      return "Недавно";
    }
  };
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Clock className="mr-2 h-5 w-5 text-amber-500" />
            Запросы на смену тарифа ({pendingRequests.length})
          </CardTitle>
          <CardDescription>
            Клиники, ожидающие подтверждения на изменение тарифа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Клиника</TableHead>
                <TableHead>Текущий тариф</TableHead>
                <TableHead>Новый тариф</TableHead>
                <TableHead>Дата запроса</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.clinicName}</TableCell>
                  <TableCell>{request.currentPlan}</TableCell>
                  <TableCell>{request.requestedPlan}</TableCell>
                  <TableCell>{formatTime(request.requestedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-10 h-9 p-0"
                        onClick={() => {
                          setSelectedRequest(request);
                          setDialogMode('approve');
                        }}
                        disabled={isLoading}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-10 h-9 p-0"
                        onClick={() => {
                          setSelectedRequest(request);
                          setDialogMode('reject');
                        }}
                        disabled={isLoading}
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Approve Dialog */}
      <Dialog open={dialogMode === 'approve'} onOpenChange={(open) => !open && setDialogMode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение изменения тарифа</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите подтвердить изменение тарифа для клиники?
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="py-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium">Клиника</h3>
                  <p className="text-base">{selectedRequest.clinicName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Текущий тариф</h3>
                    <p className="text-base">{selectedRequest.currentPlan}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Новый тариф</h3>
                    <p className="text-base">{selectedRequest.requestedPlan}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogMode(null)}>
              Отмена
            </Button>
            <Button onClick={handleApprove} disabled={isLoading}>
              Подтвердить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reject Dialog */}
      <Dialog open={dialogMode === 'reject'} onOpenChange={(open) => !open && setDialogMode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Отклонение изменения тарифа</DialogTitle>
            <DialogDescription>
              Вы хотите отклонить запрос на изменение тарифа от клиники {selectedRequest?.clinicName}?
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <label className="text-sm font-medium">Причина отклонения (необязательно)</label>
            <Textarea 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              placeholder="Укажите причину отклонения запроса"
              className="mt-1"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogMode(null)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={isLoading}>
              Отклонить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
