import { useState } from "react";
import { MESSAGES } from "../../constants/messages";

function AboutPage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <p className="text-red-500">{MESSAGES.error.generic}</p>
    );
  }

  return (
    <>
      <h1>This is the About Page</h1>
    </>
  );
}

export default AboutPage;
