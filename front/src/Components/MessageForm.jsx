import React, { useState } from "react";
import { toast } from "react-toastify";

function MessageForm({ onSendMessage, userEmail, toggleMessage }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [toEmail, setToEmail] = useState("");

  /**
   * The handleSubmit function is used to handle form submission, send a message with the provided object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(subject, content, toEmail, userEmail);
    setSubject("");
    setContent("");
    setToEmail("");
    toast.success("Message envoyé");
    if (window.innerWidth <= 480) {
      toggleMessage();
    }
  };

  return (
    <main className="main-compose ">
      <form onSubmit={handleSubmit}>
        <div className="form-row mb-3">
          <label htmlFor="to" className="col-2 col-sm-1 col-form-label">
            À
          </label>
          <div className="col-10 col-sm-11">
            <input
              type="email"
              className="form-control"
              id="to"
              placeholder=""
              required
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row mb-3">
          <label htmlFor="bcc" className="col-2 col-sm-1 col-form-label">
            Objet
          </label>
          <div className="col-10 col-sm-11">
            <input
              type="text"
              className="form-control"
              id="bcc"
              placeholder=""
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-11 ml-auto">
            <div className="form-group mt-4">
              <textarea
                className="form-control"
                id="message"
                name="body"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="connecter">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default MessageForm;
