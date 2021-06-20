using System;

namespace Registration.Data
{
    public class GetAge
    {
        public static int Age(DateTimeOffset date) => (int)Math.Floor((DateTime.Now - date).TotalDays / 365.25D);
    }
}