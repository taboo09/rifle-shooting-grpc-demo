using System.Collections.Generic;

namespace Registration.Data
{
    public class CriminalRecords
    {
        private static readonly List<CriminalRecord> _records = new List<CriminalRecord>()
        {
            new CriminalRecord("John", "Smith", "A11 A11"),
            new CriminalRecord("Joe", "Bloggs", "D44 D44"),
            new CriminalRecord("Jane", "Doe", "E55 E55")
        };

        public static bool HasRecord(CriminalRecord person) => _records.Contains(person);
    }
}