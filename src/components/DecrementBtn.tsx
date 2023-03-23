import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { type Quote } from "~/pages";
import { api } from "~/utils/api";

export function DecrementBtn({
  quote,
  updateQuote,
  lowestCountState: [isLowestCount, setIsLowestCount],
}: {
  quote: Quote;
  updateQuote: (quote: Quote) => void;
  lowestCountState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const decrementMutation = api.quote.decrement.useMutation();

  const handleDecrementCount = () => {
    if (quote.id === undefined) return;
    decrementMutation
      .mutateAsync({ id: quote.id })
      .then((res: Quote) => {
        if (res === undefined) return;
        if (res.count === 0) {
          setIsLowestCount(true);
        }
        updateQuote(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <button
      className="decrementCount disabled:opacity-40"
      onClick={handleDecrementCount}
      disabled={isLowestCount}
    >
      <AiOutlineMinusCircle className="h-16 w-16 text-slate-200" />
    </button>
  );
}
