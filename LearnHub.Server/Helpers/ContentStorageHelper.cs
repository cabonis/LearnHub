namespace LearnHub.Server.Helpers
{
	public class ContentStorageHelper : IContentHelper
	{
		private readonly string _storageFolder;

		public ContentStorageHelper(IConfiguration configuration)
		{
			string appData = Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData);
			string folder = configuration.GetSection("Configuration").GetValue<string>("ContentStorageFolder");
			_storageFolder = Path.Combine(appData, folder);
		}

		public async Task StoreContentAsync(string fileName, IFormFile content)
		{
			if (!Directory.Exists(_storageFolder))
			{
				Directory.CreateDirectory(_storageFolder);
			}

			string path = Path.Combine(_storageFolder, fileName);

			FileStream fileStream = new FileStream(path, FileMode.Create);
			await content.CopyToAsync(fileStream)
				.ContinueWith((f) => fileStream.Close());
		}

		public Stream GetContent(string fileName)
		{
			string path = Path.Combine(_storageFolder, fileName);
			return new FileStream(path, FileMode.Open, FileAccess.Read);
		}

		public void RemoveContent(string fileName)
		{
			string path = Path.Combine(_storageFolder, fileName);
			File.Delete(path);
		}
	}

	public interface IContentHelper
	{
		Task StoreContentAsync(string fileName, IFormFile content);

		Stream GetContent(string fileName);

		void RemoveContent(string fileName);
	}
}
