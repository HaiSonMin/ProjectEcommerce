import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import IconSupport from '@/assets/chat/live-chat.png';
import Chat from '@/assets/chat/helpline.png';
import { IoSend } from 'react-icons/io5';
import { FiList } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { Socket, io as socketClient } from 'socket.io-client';
import PopupInfo from './common/PopupInfo';
import { WEB_STORE_NAME } from '@/constant';
import { UseChatApi } from '@/apis-use';
import { IChatContent } from '@/interfaces/models';
import { randomKey } from '@/utils';
import { ISessionStoreChatInfoUser } from '@/interfaces/shared';
import { useSelector } from 'react-redux';
import { getUserChat } from '@/storeReducer/public/chatSlice';

const animationBoxChat = keyframes`
    0% {scale: 0; opacity: 0}
    100% {scale: 1;opacity: 1}
`;

const PopupChatStyled = styled.div<{ $isDisplay: boolean }>`
  display: flex;
  animation: ${animationBoxChat} 0.5s cubic-bezier(0.66, 0, 0, 1) forwards;
  flex-direction: column;
  position: fixed;
  top: 30vh;
  right: 5rem;
  height: 45rem;
  width: 40rem;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 999;
  box-shadow: var(--shadow-around);
`;

const IConChat = styled.div`
  position: fixed;
  top: 80vh;
  right: 5rem;
  width: 5rem;
  height: 5rem;
  box-shadow: var(--shadow-around);
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    object-fit: contain;
    object-position: center;
  }
  animation: ${animationBoxChat} 0.5s cubic-bezier(0.66, 0, 0, 1) forwards;
`;

const Header = styled.div`
  background-color: var(--color-primary);
  height: 5rem;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;

  .header-title {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    color: var(--color-white);
    margin-left: 1rem;

    p:last-child {
      font-size: 1rem;
      color: #ffffffb3;
    }
  }

  .header-info {
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 1rem;
    svg {
      color: var(--color-white);
      width: 2.4rem;
      height: 2.4rem;
      cursor: pointer;
      opacity: 0.9;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

const Body = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 1.6rem;
  overflow-y: auto;
  flex-grow: 1;
  background-color: var(--color-white);

  .message__block {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    &--icon {
      margin-top: auto;
      width: 3.2rem;
      height: 3.2rem;
      img {
        object-fit: contain;
      }
    }
    &--content {
      display: flex;
      flex-direction: column;
      align-self: flex-end;
      gap: 5px;
      width: calc(100% - 10rem);

      &-text {
        width: fit-content;
        margin-right: auto;
        background-color: var(--color-grey-200);
        padding: 5px 1rem;
        border-radius: 1rem;
        font-size: 1.2rem;
      }
    }
  }

  .message__block.mine {
    .message__block--content {
      margin-left: auto;
      &-text {
        margin-right: 0;
        margin-left: auto;
        background-color: var(--color-primary);
        color: var(--color-white);
      }
    }
  }

  .time--stamp {
    font-size: 1.2rem;
    color: var(--color-grey-400);
    margin-left: 4.2rem;
  }
`;

const Footer = styled.div`
  width: 100%;
  padding: 1rem 2rem 1rem 1rem;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-grey-400);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .input-message {
    border: none;
    line-height: 1.33;
    height: 5.5rem;
    max-height: 30rem;
    overflow: auto;
    overflow-wrap: break-word;
    padding: 8px 5px 5px 15px;
    white-space: pre-wrap;
    width: calc(100% - 6rem);
    resize: none;
    font-size: 1.4rem;

    &:focus {
      outline: none;
    }
  }

  .box-send {
    display: flex;
    gap: 1rem;
    position: relative;

    svg {
      width: 2.4rem;
      height: 2.4rem;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

const BoxEmoji = styled.div<{ $isDisplay: boolean }>`
  display: ${(props) => (props.$isDisplay ? 'block' : 'none')};
  position: absolute;
  top: -40rem;
  right: 1.2rem;
  z-index: 1000;
`;

export default function PopupChat() {
  const [isDisplayBoxChat, setIsDisplayBoxChat] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isDisplayBoxEmoji, setIsDisplayBoxEmoji] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [isDisplayBoxInfo, setIsDisplayBoxInfo] = useState<boolean>(true);
  const [messagesDetail, setMessagesDetail] = useState<
    Array<{ userEmail: string; userMessages: Array<string> }>
  >([]);
  const [adminChatting, setAdminChatting] = useState<string>('');
  const { chat_user } = useSelector(getUserChat);

  const handleDisplayBoxChat = () => setIsDisplayBoxChat(!isDisplayBoxChat);

  const handleSetDisplayBoxEmoji = () => {
    setIsDisplayBoxEmoji(!isDisplayBoxEmoji);
  };

  const handleEmojiClick = ({ emoji }: EmojiClickData) => {
    setInputMessage((pre) => pre + emoji);
  };

  const handleSetInputMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  const handlerCloseBoxInfo = () => setIsDisplayBoxInfo(false);

  const handleSendMessage = () => {
    if (!inputMessage) return;
    const roomStore = sessionStorage.getItem(
      WEB_STORE_NAME.USER_NAME_LOCAL_STORE
    );
    if (roomStore) {
      const { roomId, userEmail } = JSON.parse(
        roomStore
      ) as ISessionStoreChatInfoUser;
      socket?.emit('send_message', {
        chat_roomId: roomId,
        chat_userMessage: inputMessage,
        chat_userEmail: userEmail,
      });
      setInputMessage('');
    }
  };

  // init socket
  useEffect(() => {
    const newSocket = socketClient(import.meta.env.VITE_BASE_URL_SERVER, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Trigger user chatting
  useEffect(() => {
    if (inputMessage.length)
      socket?.emit('chatting', `${chat_user.chat_userName} đang soạn tin`);
    else socket?.emit('chatting', '');
  }, [inputMessage]);

  // Tricker when server emit data
  useEffect(() => {
    // When client have receive chat, we update chat into DB
    socket?.on('receive_message', (data: Array<string>) => {
      let messagesChat: Array<{
        userEmail: string;
        userMessages: Array<string>;
      }> = [];

      data.forEach((msg) => {
        const messageParse: IChatContent = JSON.parse(msg);
        if (!messagesChat.length)
          messagesChat.push({
            userEmail: messageParse.chat_userEmail,
            userMessages: [messageParse.chat_userMessage],
          });
        else if (
          messagesChat[messagesChat.length - 1].userEmail ===
          messageParse.chat_userEmail
        )
          messagesChat[messagesChat.length - 1].userMessages.push(
            messageParse.chat_userMessage
          );
        else
          messagesChat.push({
            userEmail: messageParse.chat_userEmail,
            userMessages: [messageParse.chat_userMessage],
          });
      });
      setMessagesDetail(messagesChat);
    });

    socket?.on('chatting', (msg: string) => setAdminChatting(msg));

    return () => {
      socket?.off('receive_message');
      socket?.off('chatting');
    };
  }, [socket]);

  return (
    <>
      {!isDisplayBoxChat ? (
        <IConChat onClick={handleDisplayBoxChat}>
          <img src={Chat} alt='Icon Chat' />
        </IConChat>
      ) : (
        <PopupChatStyled $isDisplay={isDisplayBoxChat}>
          <Header>
            <img src={IconSupport} alt='Icon Support' />
            <div className='header-title'>
              <p>Chat với nhân viên tư vấn</p>
              <p>Hỗ trợ thắc mắc</p>
            </div>
            <div className='header-info'>
              <FiList />
              <AiOutlineClose onClick={handleDisplayBoxChat} />
            </div>
          </Header>
          {isDisplayBoxInfo ? (
            <PopupInfo
              socket={socket}
              handleCloseBoxInfo={handlerCloseBoxInfo}
            />
          ) : (
            <>
              <Body>
                {messagesDetail.map((msgDetail) => (
                  <div
                    className={`message__block ${
                      chat_user.chat_userEmail === msgDetail.userEmail && 'mine'
                    }`}
                    key={randomKey()}
                  >
                    {chat_user.chat_userEmail !== msgDetail.userEmail && (
                      <div className='message__block--icon'>
                        <img src={IconSupport} alt='Icon Support' />
                      </div>
                    )}
                    <div className='message__block--content'>
                      {msgDetail.userMessages.map((msg) => (
                        <p
                          className='message__block--content-text'
                          key={randomKey()}
                        >
                          {msg}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                {!adminChatting.includes(chat_user.chat_userName) && (
                  <p className='time--stamp'>{adminChatting}</p>
                )}
              </Body>
              <Footer>
                <textarea
                  placeholder='Nhập nội dung...'
                  maxLength={2000}
                  className='input-message'
                  value={inputMessage}
                  onChange={handleSetInputMessage}
                />
                <div className='box-send'>
                  <MdOutlineInsertEmoticon onClick={handleSetDisplayBoxEmoji} />
                  <IoSend onClick={handleSendMessage} />
                  <BoxEmoji $isDisplay={isDisplayBoxEmoji}>
                    <EmojiPicker
                      height={400}
                      lazyLoadEmojis={true}
                      onEmojiClick={handleEmojiClick}
                    />
                  </BoxEmoji>
                </div>
              </Footer>
            </>
          )}
        </PopupChatStyled>
      )}
    </>
  );
}
