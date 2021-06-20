namespace Registration.Data
{
    // internal class CriminalRecord
    // {
    //     public string FirstName { get; set; }
    //     public string LastName { get; set; }
    //     public string PostCode { get; set; }
    // }

    public record CriminalRecord(string FirstName, string LastName, string PostCode);
}