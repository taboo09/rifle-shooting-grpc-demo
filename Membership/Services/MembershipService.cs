using System;
using System.Linq;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Members;
using Microsoft.Extensions.Logging;
using static Members.Membership;

namespace Membership
{
    public class MembershipService : MembershipBase
    {
        private readonly ILogger<MembershipService> _logger;
        public MembershipService(ILogger<MembershipService> logger)
        {
            _logger = logger;
        }

        public override async Task GetMembersStream(Empty request, IServerStreamWriter<Member> memberResponse, ServerCallContext context)
        {
            _logger.LogInformation($"Request from: {context.Peer}");
            _logger.LogInformation($"Request from: {context.RequestHeaders.ToList()[0].ToString()}");
            _logger.LogInformation($"Request: {request}");

            var rand = new Random();

            for (int i = 0; i < 10; i++)
            {
                if (context.CancellationToken.IsCancellationRequested)
                {
                    _logger.LogInformation($"Request has been cancelled by the user");
                    break;
                }

                await memberResponse.WriteAsync(new Member
                {
                    Id = 10 + i + 1,
                    Name = "John Defoe",
                    Age = rand.Next(18, 70),
                    Address = "1 Kings Lane",
                    City = "Tamworth",
                    PostCode = "X00 X00",
                    Dob = Timestamp.FromDateTimeOffset(DateTimeOffset.UtcNow),
                });

                await Task.Delay(5000);
            }
        }
    }
}
