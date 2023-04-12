using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace AnimalRecognition.MailService
{
    public class EmailService
    {
        private readonly EmailServiceSettings _settings;

        public EmailService(IOptions<EmailServiceSettings> settings)
        {
            if (settings is null || settings.Value is null) throw new ArgumentNullException(nameof(settings));

            _settings = settings.Value;
        }

        public void SendMessage(string addressRecipient, string nameSenders, string addressSenders, string subject, string body)
        {
            var message = CreateMessage(addressRecipient, nameSenders, addressSenders, subject, body);

            using var smtp = new SmtpClient();
            
            smtp.Connect(_settings.Host, _settings.Port, true);
            smtp.Authenticate(_settings.Username, _settings.Password);

            smtp.Send(message);

            smtp.Disconnect(true);
        }

        public async Task SendMessageAsync(string addressRecipient, string nameSenders, string addressSenders, string subject, string body, CancellationToken cancel = default)
        {
            var message = CreateMessage(addressRecipient, nameSenders, addressSenders, subject, body);

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(_settings.Host, _settings.Port, true, cancel).ConfigureAwait(false);
            await smtp.AuthenticateAsync(_settings.Username, _settings.Password, cancel).ConfigureAwait(false);

            await smtp.SendAsync(message, cancel).ConfigureAwait(false);

            await smtp.DisconnectAsync(true, cancel).ConfigureAwait(false);
        }


        private static MimeMessage CreateMessage(string addressRecipient, string nameSenders, string addressSenders, string subject, string body)
        {
            var message = new MimeMessage()
            {
                Subject = subject,
                Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = body }
            };

            message.From.Add(new MailboxAddress(nameSenders, addressSenders));
            message.To.Add(MailboxAddress.Parse(addressRecipient));

            return message;
        }
    }
}