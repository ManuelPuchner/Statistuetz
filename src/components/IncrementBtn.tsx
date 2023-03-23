import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { type Quote } from "~/pages";
import { api } from "~/utils/api";

export function IncrementBtn({
  quote,
  updateQuote,
  lowestCountState: [_, setIsLowestCount],
}: {
  quote: Quote;
  updateQuote: (quote: Quote) => void;
  lowestCountState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const incrementMutation = api.quote.increment.useMutation();
  const handleIncrementCount = () => {
    if (quote.id === undefined) return;
    incrementMutation
      .mutateAsync({ id: quote.id })
      .then((res: Quote) => {
        if (res === undefined) return;
        console.log(res);
        setIsLowestCount(false);
        updateQuote(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <button className="incrementCount" onClick={handleIncrementCount}>
      <AiOutlinePlusCircle className="h-16 w-16 text-slate-200" />
    </button>
  );
}
