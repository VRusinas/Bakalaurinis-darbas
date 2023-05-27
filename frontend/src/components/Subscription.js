import { useState } from "react";
import axios from "axios";
import "../styles/subscriptions.css"
import "../styles/global.css"
import "../styles/button.css"

const Subscription = () => {

  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [createSubscription, setCreateSubscription] = useState({
    email: "",
  });

  const updateSubscriptionField = (e) => {
    const { name, value } = e.target;
    setCreateSubscription({
      ...createSubscription,
      [name]: value,
    });
  };

  const createEmailSubscription = async (e) => {
    e.preventDefault();

    if (!createSubscription.email) {
      setError("Fill in the field with your chosen email");
      return;
    }

    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/email/send",
        createSubscription
      );

      setSuccess("Subscription successful");

      setEmail(createSubscription.email);

      setCreateSubscription({
        email: "",
      });

    } catch (error) {
      setError("Subscription failed. Enter a valid email");
    }
  };

  return (
    <div className="subscribtion-container">
      <form onSubmit={createEmailSubscription}>
        <h4 className="subscribtion-text white">
          Enter your email you want to subscribe to the wellness center
        </h4>
        <div className="subscriber-box">
          <input
            className="subscribtion-input"
            onChange={updateSubscriptionField}
            placeholder=" Enter your email..."
            value={createSubscription.email}
            type="email"
            name="email"
          />
          <button className="button" type="submit">
            Subscribe
          </button>
          <div className="error-subscribtion">
    
        </div>

        </div>
        {error && <p className="error-message white">{error}</p>}
        {success && <p className="success-message white">{success}</p>}
      </form>
    </div>
  );
}

export default Subscription;
