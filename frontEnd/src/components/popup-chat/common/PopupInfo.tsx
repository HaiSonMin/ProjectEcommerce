import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { InputAuth, InputChecked, Button, Heading } from '@/components/shared';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { UseChatApi } from '@/apis-use';
import { IChatUser } from '@/interfaces/models';
import { WEB_STORE_NAME } from '@/constant';
import { setUserChat } from '@/storeReducer/public/chatSlice';
import { useDispatch } from 'react-redux';
import ISessionStoreChatInfoUser from '@/interfaces/shared/ISessionStoreChatInfoUser.interface';

const PopupInfoStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.6rem;
  overflow-y: auto;
  flex-grow: 1;
  background-color: var(--color-white);
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BoxSex = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem;
`;

const BoxBtn = styled.div`
  gap: 1rem;
  margin-top: 1.5rem;
`;

// chat_emailUser
// chat_phoneUser
const REGEX_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const REGEX_EMAIL = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

interface IProps {
  socket?: Socket;
  handleCloseBoxInfo: () => void;
}
export default function PopupInfo({ socket, handleCloseBoxInfo }: IProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IChatUser>();
  const [isMale, setIsMale] = useState<boolean>(true);
  const { createChat } = UseChatApi.createChat();

  const onSubmit = (dataForm: IChatUser) => {
    const dataSubmit: IChatUser = {
      ...dataForm,
      chat_userSex: isMale ? 'Anh' : 'Chị',
    };

    // create room to DB before join room
    createChat(dataSubmit, {
      onSuccess: (dataResponse) => {
        socket?.emit('user_join_room', dataResponse.metadata);
        const dataUserSessionStore: ISessionStoreChatInfoUser = {
          roomId: dataResponse.metadata?._id,
          userEmail: dataResponse.metadata?.chat_user.chat_userEmail,
        };
        sessionStorage.setItem(
          WEB_STORE_NAME.USER_NAME_LOCAL_STORE,
          JSON.stringify(dataUserSessionStore)
        );
        dispatch(
          setUserChat({
            chat_roomId: dataResponse.metadata?._id,
            chat_user: dataSubmit,
          })
        );
      },
    });
  };

  useEffect(() => {
    socket?.on('user_join_room', (data) => {
      console.log('accept user join room');
      console.log(data);
      handleCloseBoxInfo();
    });
    return () => {
      socket?.off('user_join_room');
    };
  }, [socket]);

  return (
    <PopupInfoStyled>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading $as='h4' className='mb-[1rem]'>
          Nhập thông tin cơ bản
        </Heading>
        <InputAuth
          id='inputChatUserName'
          register={register('chat_userName', {
            required: { value: true, message: 'Vui lòng bổ sung tên' },
          })}
          label='Nhập tên của bạn'
          hasValue={!!watch('chat_userName')}
          type='text'
          error={errors.chat_userName?.message}
        />
        <InputAuth
          id='inputChatEmailUser'
          register={register('chat_userEmail', {
            required: { value: true, message: 'Vui lòng bổ sung email' },
            validate: (emailInput) => {
              if (!emailInput.match(REGEX_EMAIL)) return 'Email không hợp lệ';
            },
          })}
          type='text'
          label='Nhập email của bạn'
          hasValue={!!watch('chat_userEmail')}
          error={errors.chat_userEmail?.message}
        />
        <InputAuth
          id='inputChatPhoneUser'
          type='text'
          register={register('chat_userPhone', {
            required: {
              value: true,
              message: 'Vui lòng bổ sung số điện thoại',
            },
            validate: (emailInput) => {
              if (!emailInput.match(REGEX_PHONE))
                return 'Số điện thoại không hợp lệ';
            },
          })}
          label='Nhập số điện thoại của bạn'
          hasValue={!!watch('chat_userPhone')}
          error={errors.chat_userPhone?.message}
        />
        <Heading $as='h4'>Giới tính xưng hô</Heading>
        <BoxSex>
          <div onClick={() => setIsMale(true)}>
            <InputChecked isChose={isMale} label='Anh' />
          </div>
          <div onClick={() => setIsMale(false)}>
            <InputChecked isChose={!isMale} label='Chị' />
          </div>
        </BoxSex>
        <BoxBtn>
          <Button>Bắt đầu chat</Button>
        </BoxBtn>
      </Form>
    </PopupInfoStyled>
  );
}
