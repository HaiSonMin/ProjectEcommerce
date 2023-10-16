import { randomKey } from "@/utils";
import {
  optionsRankSMem,
  optionsRankSNew,
  optionsRankSNull,
  optionsRankSVip,
} from "./optionsRank";

const levelRank = [
  {
    key: randomKey(),
    rankName: "S-Null",
    values: optionsRankSNull,
  },
  {
    key: randomKey(),
    rankName: "S-New",
    values: optionsRankSNew,
  },
  {
    key: randomKey(),
    rankName: "S-Mem",
    values: optionsRankSMem,
  },
  {
    key: randomKey(),
    rankName: "S-Vip",
    values: optionsRankSVip,
  },
];

export default levelRank;
