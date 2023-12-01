import { styled } from 'styled-components';
import HeaderAdminMenu from './HeaderAdminMenu';
import AvatarAdmin from '@/assets/icons/avatar-admin.png';
import { useEffect, useState } from 'react';
import { WEB_STORE_NAME } from '@/constant';
import { ILocalStoreUser } from '@/interfaces/shared';

const HeaderAdminStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-grey-300);
  padding: 1.2rem 2.4rem;

  .box--info {
    display: flex;
    align-items: center;
    gap: 1rem;

    &-avatar {
      width: 4rem;
      height: 4rem;

      img {
        object-fit: contain;
        object-position: center;
      }
    }

    &-username {
      font-weight: 600;
    }
  }
`;

const HeaderAdmin = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const userStore = localStorage.getItem(
      WEB_STORE_NAME.USER_NAME_LOCAL_STORE
    );
    if (userStore) {
      const infoUser: ILocalStoreUser = JSON.parse(userStore);
      setUserName(infoUser.userFullName);
    }
  }, []);

  return (
    <HeaderAdminStyled>
      <div className='box--info'>
        <div className='box--info-avatar'>
          <img src={AvatarAdmin} alt='Avatar admin' />
        </div>
        <p className='box--info-username'>{userName}</p>
      </div>
      <HeaderAdminMenu />
    </HeaderAdminStyled>
  );
};

export default HeaderAdmin;
