namespace backend.Dto
{
    public class ShareSummaryDto
    {
        public required string[] RecipientEmails { get; set; }
        public string? Message { get; set; } // optional, can be null
    }

}
