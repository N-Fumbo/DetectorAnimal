namespace AnimalRecognition.AccountManager.Heplers
{
    public static class HashPasswordHelper
    {
        public static string HasPassword(string password) =>
            BCrypt.Net.BCrypt.HashPassword(password, 12);

        public static bool Verify(string password, string passwordHash) =>
            BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }
}