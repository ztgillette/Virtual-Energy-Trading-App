'use client';
import { useState } from "react";
import { getNextDay } from "../lib/date";

export type Bid = {
  hour: number;
  type: "BUY" | "SELL";
  price: number;
  quantity: number;
  damPrice: number;
  status: string;
  rtmPrice: number | undefined;
  profit: number | undefined;
};

type Props = {
  onSubmit: (bid: Bid) => void;
  date: string;
};

export default function BidForm({ onSubmit, date }: Props) {
  const [hour, setHour] = useState<number | "">(0);
  const [type, setType] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState<number | "">(0);
  const [price, setPrice] = useState<number | "">(0);
  const [damPrice, setDamPrice] = useState(0);
  const [status, setStatus] = useState("Entered");
  const [rtmPrice, setRtmPrice] = useState(0);
  const [profit, setProfit] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (hour === "" || price === "" || quantity === "") return;

    onSubmit({ hour: Number(hour), type, price: Number(price), quantity: Number(quantity), damPrice, status, rtmPrice, profit });
    
    //reset form fields
    setHour("");
    setType("BUY");
    setPrice("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>

      <label>
        Tomorrow's Date: {getNextDay(date)}
      </label>

      <label>
        Hour:
        <input
          type="number"
          min="0"
          max="23"
          value={hour}
          onChange={(e) => {
            const n = e.currentTarget.valueAsNumber;
            setHour(Number.isNaN(n) ? "" : n);
          }}
        />
      </label>

      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value as "BUY" | "SELL")}>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
      </label>

      <label>
        Price:
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => {
            const n = e.currentTarget.valueAsNumber;
            setPrice(Number.isNaN(n) ? "" : n);
          }}
        />
      </label>

      <label>
        Quantity:
        <input
          type="number"
          min="0"
          step="0.01"
          value={quantity}
          onChange={(e) => {
            const n = e.currentTarget.valueAsNumber;
            setQuantity(Number.isNaN(n) ? "" : n);
          }}
        />
      </label>


      <button type="submit">Place Bid</button>
    </form>
  );
}
