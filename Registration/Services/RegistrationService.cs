using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Members;
using Microsoft.Extensions.Logging;
using NewUser;
using Registration.Data;
using static NewUser.NewUser;

namespace Registration
{
    public class RegistrationService : NewUserBase
    {
        private readonly ILogger<RegistrationService> _logger;
        public RegistrationService(ILogger<RegistrationService> logger)
        {
            _logger = logger;
        }

        public override async Task<UserValid> AddUser(User request, ServerCallContext context)
        {
            _logger.LogInformation($"Request from: {context.Peer}");
            _logger.LogInformation($"Request from: {context.RequestHeaders.ToList()[0].ToString()}");
            _logger.LogInformation($"Request: {request}");

            var age = GetAge.Age(request.Dob.ToDateTimeOffset());

            if (age < 18) 
            {
                return new UserValid() { Valid = false, ErrorMessage = "User is under 18!" };
            }

            var hasRecord = CriminalRecords.HasRecord(new CriminalRecord(request.FirstName, request.LastName, request.PostCode));

            if (hasRecord)
            {
                return new UserValid() { Valid = false, ErrorMessage = "User has criminal record!" };
            }

            await CallMembershipService(request, age);

            return new UserValid() { Valid = true };;
        }

        private async Task CallMembershipService(User user, int age)
        {
            using var channel = GrpcChannel.ForAddress("https://localhost:5072");

            var client =  new Membership.MembershipClient(channel);

            client.SetMember(new MemberIn
            {
                Name = $"{user.FirstName} {user.LastName}",
                Age = age,
                Address = user.Address,
                City = user.City,
                PostCode = user.PostCode,
                Dob = user.Dob
            });

            await Task.Delay(100);
        }
    }
}
