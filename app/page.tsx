"use client";
import Cell from "./components/cell";
import { useEffect, useState } from "react";
import ResultRow from "./components/resultRow";
import Link from "next/link";

export default function Home() {

  return (
    <div className="container">

      <div className="inputs">
        <input className="field" type="text" id="name" placeholder="Player one name ..." required />
        <input className="field" type="text" id="name" placeholder="Player two name ..." required />
      </div>

      <div className="play-btns">
        <Link className="online" href={"/game"} >Play online </Link>
        <Link className="onscreen" href={"/game"} >Same screen </Link>
      </div>
    </div>
  );
}
