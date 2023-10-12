import styled from "styled-components";
import { BsHeadphones } from "react-icons/bs";
import { FcAlarmClock } from "react-icons/fc";
import {SlEnvolopeLetter} from "react-icons/sl"
import {MdMarkEmailRead} from "react-icons/md"
import CardSupport from "./CardSupport";
import CountdownLayout from "@/components/CountdownLayout";
const ContainerSupport = styled.div`
margin-top: 2rem;
display: grid;
grid-template-columns: auto auto;
gap: 1rem;
`;

export default function Support() {
  return (
    <>
    <ContainerSupport>
      <CardSupport
        Icon={<BsHeadphones />}
        Details="Tư vấn mua hàng (8h00 - 22h00)"
        Number="1800.2097"
        />
      <CardSupport
        Icon={<FcAlarmClock />}
        Details="Tư vấn mua hàng (8h00 - 22h00)"
        Number="1800.2097"
        />
      <CardSupport
        Icon={<SlEnvolopeLetter />}
        Details="Tư vấn mua hàng (8h00 - 22h00)"
        Number="1800.2097"
        />
      <CardSupport
        Icon={<MdMarkEmailRead />}
        Details="Tư vấn mua hàng (8h00 - 22h00)"
        Number="1800.2097"
        />
    </ContainerSupport>
    <CountdownLayout/>
    </>
  );
}
