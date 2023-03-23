import React from "react";

import { AiOutlineDelete } from "react-icons/ai";
import { type Quote, useQuotesStore } from "~/pages";
import { useState } from "react";

type QuoteCardProps = {
  quote: Quote;
};

import { api } from "~/utils/api";
import { DecrementBtn } from "./DecrementBtn";
import { IncrementBtn } from "./IncrementBtn";

function QuoteCard({ quote }: QuoteCardProps) {
  const { updateQuote, deleteQuote: _deleteQuote } = useQuotesStore();
  const lowestCountState = useState(quote.count === 0);
  const [textBeforeEdit, setTextBeforeEdit] = useState(quote.text);

  const textUpdateMutation = api.quote.changeText.useMutation();

  const handleTextChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
    const newText = e.target.innerText;
    const newQuote = { ...quote, text: newText };
    console.log(newQuote);

    updateQuote(newQuote);
  };

  const handleTextChangeFinish = () => {
    if (quote.id === undefined) return;
    textUpdateMutation
      .mutateAsync({ id: quote.id, text: quote.text })
      .then((res: Quote) => {
        console.log(res);
        setTextBeforeEdit(res.text);
      })
      .catch((err) => {
        console.log(err);
        setTextBeforeEdit(textBeforeEdit);
      });
  };

  const deleteMutation = api.quote.delete.useMutation();

  const deleteQuote = () => {
    if (quote.id === undefined) return;
    deleteMutation
      .mutateAsync({ id: quote.id })
      .then((res) => {
        _deleteQuote(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="items-between m-4 flex h-72 w-72  flex-col justify-between rounded-lg bg-slate-200 bg-opacity-50 p-5">
      <button onClick={deleteQuote} className="">
        <AiOutlineDelete className="h-12 w-12 text-slate-200" />
      </button>
      <div className="mt-8">
        <p
          className="text-3xl text-white"
          onInput={handleTextChange}
          onBlur={handleTextChangeFinish}
          contentEditable
        >
          {textBeforeEdit}
        </p>
      </div>
      <div className="flex w-full items-center justify-between">
        <DecrementBtn
          quote={quote}
          updateQuote={updateQuote}
          lowestCountState={lowestCountState}
        />
        <p className="text-2xl text-white">{quote.count}</p>
        <IncrementBtn
          quote={quote}
          updateQuote={updateQuote}
          lowestCountState={lowestCountState}
        />
      </div>
    </div>
  );
}

export default QuoteCard;
