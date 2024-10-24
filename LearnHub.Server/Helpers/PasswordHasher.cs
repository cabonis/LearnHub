using BCrypt.Net;

namespace LearnHub.Server.Helpers
{
	public class BcryptPasswordHasher : IPasswordHasher
	{
		private const int WorkFactor = 11;

		public virtual string Hash(string password) => BCrypt.Net.BCrypt.HashPassword(password, WorkFactor);

		public virtual bool Verify(string password, string hash)
		{
			try
			{
				return BCrypt.Net.BCrypt.Verify(password, hash);
			}
			catch (SaltParseException)
			{
				return false;
			}
		}
	}

	public interface IPasswordHasher
	{
		string Hash(string password);

		bool Verify(string password, string hash);
	}
}
