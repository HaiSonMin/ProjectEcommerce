import useCountDown from '@/hooks/useCountDown';
import { randomKey } from '@/utils';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import styled from 'styled-components';

const CountDownStyled = styled.div`
  display: flex;
  gap: 8px;
`;

const BoxTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1px;
  padding: 2px 4px;
  height: fit-content;
  background-color: var(--color-white);
  border-radius: 5px;
  overflow: hidden;
`;

const BoxUnitTime = styled.div<{ $translateY: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 2rem;
  transform: translateY(${(props) => props.$translateY}px);
  transition: all 0.7s cubic-bezier(0.35, 0.82, 0.965, 1);
`;

const UnitTime = styled.p`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
`;

const VALUE_TRANSLATE_Y = -20;

export default function CountDown({ timeLeft }) {
  const time = useCountDown(timeLeft);
  const date = dayjs(time);

  const hour = date.hour();
  const minute = date.minute();
  const second = date.second();
  const unitHour = hour % 10;
  const dozenHour = Math.floor(hour / 10);
  const unitMinute = minute % 10;
  const dozenMinute = Math.floor(minute / 10);
  const unitSecond = second % 10;
  const dozenSecond = Math.floor(second / 10);

  const arrUnitTime = useMemo(() => {
    return Array.from({ length: 10 }, (v, i) => i);
  }, []);

  return (
    <CountDownStyled>
      {/* Hour */}
      <BoxTime>
        <BoxUnitTime $translateY={VALUE_TRANSLATE_Y * dozenHour}>
          {arrUnitTime.map((v) => (
            <UnitTime key={randomKey()}>{v}</UnitTime>
          ))}
        </BoxUnitTime>
        <BoxUnitTime $translateY={VALUE_TRANSLATE_Y * unitHour}>
          {arrUnitTime.map((v) => (
            <UnitTime key={randomKey()}>{v}</UnitTime>
          ))}
        </BoxUnitTime>
      </BoxTime>

      {/* Minute */}
      <BoxTime>
        <BoxUnitTime $translateY={VALUE_TRANSLATE_Y * dozenMinute}>
          {arrUnitTime.map((v) => (
            <UnitTime key={randomKey()}>{v}</UnitTime>
          ))}
        </BoxUnitTime>
        <BoxUnitTime $translateY={VALUE_TRANSLATE_Y * unitMinute}>
          {arrUnitTime.map((v) => (
            <UnitTime key={randomKey()}>{v}</UnitTime>
          ))}
        </BoxUnitTime>
      </BoxTime>

      {/* Second */}
      <BoxTime>
        <BoxUnitTime $translateY={VALUE_TRANSLATE_Y * dozenSecond}>
          {arrUnitTime.map((v) => (
            <UnitTime key={randomKey()}>{v}</UnitTime>
          ))}
        </BoxUnitTime>
        <BoxUnitTime $translateY={VALUE_TRANSLATE_Y * unitSecond}>
          {arrUnitTime.map((v) => (
            <UnitTime key={randomKey()}>{v}</UnitTime>
          ))}
        </BoxUnitTime>
      </BoxTime>
    </CountDownStyled>
  );
}
