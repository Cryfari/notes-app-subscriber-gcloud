/**
 * listener
 */
class Listener {
  /**
   * @param {service} notesService
   * @param {service} mailSender
   */
  constructor(notesService, mailSender) {
    this._notesService = notesService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  /**
   * @param {string} message
   */
  async listen(message) {
    try {
      const {userId, targetEmail} = JSON.parse(message.data.toString());
      const notes = await this._notesService.getNotes(userId);
      const result = await this._mailSender.sendEmail(
          targetEmail,
          JSON.stringify(notes),
      );
      console.log(result);
      message.ack();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
