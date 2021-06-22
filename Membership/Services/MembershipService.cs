using System;
using System.Linq;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Members;
using Membership.Data;
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

        public override async Task GetMembersStream(Empty request, IServerStreamWriter<MemberOut> memberResponse, ServerCallContext context)
        {
            _logger.LogInformation($"Request from: {context.Peer}");
            _logger.LogInformation($"Request from: {context.RequestHeaders.ToList()[0].ToString()}");
            _logger.LogInformation($"Request: {request}");

            var rand = new Random();

            while (!context.CancellationToken.IsCancellationRequested)
            {
                if (Singleton.Members.Count > 0)
                {                
                    for(var i = 0; i < Singleton.Members.Count; i++)
                    {
                        await memberResponse.WriteAsync(Singleton.Members[i]);
                    }

                    Singleton.Clear();

                    // await Task.Delay(2000);
                }            
            }

            _logger.LogInformation($"Request has been cancelled by the user");
        }

        public override async Task<Empty> SetMember(MemberIn request, ServerCallContext context)
        {
            await Task.Delay(1000);

            var rand = new Random();

            Singleton.Members.Add(new  MemberOut
            {
                Id = rand.Next(1, 1000),
                Name = request.Name,
                Age = request.Age,
                Address = request.Address,
                City = request.City,
                PostCode = request.PostCode,
                Dob = request.Dob
            });

            return new Empty();
        }
    }
}
