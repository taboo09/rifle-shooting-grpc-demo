using System.Collections.Generic;
using Members;

namespace Membership.Data
{
    public sealed class Singleton
    {
        private static readonly Singleton instance = new Singleton();

        public static readonly List<MemberOut> Members = new List<MemberOut>();

        private Singleton() { }

        public static Singleton Instance
        {
            get
            {
                return instance;
            }
        }

        public static void Clear() => Members.Clear();
    }

}