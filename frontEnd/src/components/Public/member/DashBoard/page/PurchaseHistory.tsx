import React from 'react';
import styled from 'styled-components';

const ContainerPurchaseHistory = styled.div`
  /* CSS cho ContainerPurchaseHistory */
`;

const Top = styled.div`
  /* CSS cho Top */
`;

const Avatar = styled.img`
  /* CSS cho Avatar */
`;

const FullName = styled.div`
  /* CSS cho FullName */
`;

const Order = styled.div`
  /* CSS cho Order */
`;

const Table = styled.table`
  /* CSS cho Table */
`;

const History = styled.div`
  /* CSS cho History */
`;

export default function PurchaseHistory() {
  return (
    <ContainerPurchaseHistory>
      <Top>
        <Avatar src="" alt="" />
        <FullName></FullName>
      </Top>
      <Order>
        <Table>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
          </tr>
        </Table>
      </Order>
      <History></History>
    </ContainerPurchaseHistory>
  );
}
