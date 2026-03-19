import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./styles/Contact.module.css";
import Button from "./reusable_UI/Button";
import Banner from "./Banner";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function ContactSection() {
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const USER_ID = import.meta.env.VITE_USER_ID;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      () => {
        alert("Message sent successfully");
        setEmail("");
        setMessage("");
      },
      (error) => {
        alert("Error: " + error.text);
      }
    );
  };

  return (
    <>
      <Banner>Ambition * Hard Work * Persistance * Engagement</Banner>
      <Banner>Dynamism * Professionalism * Clean Code * GROWTH</Banner>
      
      <div className={styles.container}>
        <form onSubmit={sendEmail}>
          <div className={styles.form}>
            <input
              type="email"
              name="email"
              className={styles.underline}
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              className={styles.underline}
              name="message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button type="submit" onClick={sendEmail} className={styles.button}>
              Send
            </Button>
          </div>
        </form>
        
        <div className={styles.socialContact}>
          <h1 className={styles.title}>Let us get in touch!</h1>

          <div className={styles.socialIcons}>
            <a className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/intissar127"
            aria-label="GitHub Profile"
          >
            <FaGithub size={24} />
          </a>

          <a
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/massaoud-intissar-789417250/"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={24} />
          </a>
        </div></div>
      </div>
    </>
  );
}

export default ContactSection;