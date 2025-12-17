public interface IPaymentService
{
    IEnumerable<Payment> GetAllPayments(); 
    Payment MakePayment(int reservationId, decimal amount);
    Payment IssueRefund(int paymentId, decimal refundAmount);
    Payment ConfirmPayment(int paymentId);
}
