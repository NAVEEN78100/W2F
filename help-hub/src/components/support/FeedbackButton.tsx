import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeedbackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button
        onClick={() => navigate("/general-feedback")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-colors"
      >
        Feedback
      </Button>
    </div>
  );
};

export default FeedbackButton;
