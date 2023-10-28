import { IUser } from "@/interfaces/models";
import { useNavigate } from "react-router-dom";
import UseUserApi from "../../../apis-use/UseAdminApi";
import { styled } from "styled-components";
import {
  ConfirmDelete,
  ConfirmUpdate,
  Menus,
  Modal,
  Table,
  Tag,
} from "@/components/shared";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdAddLink } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import { TbLockCancel, TbLockOff } from "react-icons/tb";

const UserName = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-family: "Sono";
  font-weight: 600;
  letter-spacing: 0.1px;
`;

const UserRole = styled.div<{ $userRole: string }>`
  font-size: 1.6rem;
  font-family: "Sono";
  font-weight: 500;

  color: ${(props) => {
    if (props.$userRole.toLowerCase() === "admin")
      return "var(--color-red-700)";
    if (props.$userRole.toLowerCase() === "writer")
      return "var(--color-yellow-700)";
    if (props.$userRole.toLowerCase() === "reader")
      return "var(--color-indigo-700)";
  }};
`;

const UserPhoneNumber = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  font-family: "Sono";
  font-weight: 500;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.2rem;

  & span:first-child {
    font-weight: 600;
  }

  & span:last-child {
    color: var(--color-grey-500);
  }
`;

interface IProps {
  key: React.Key;
  user: IUser;
}

export default function UserRow(props: IProps) {
  const navigate = useNavigate();
  const { isDeletingUser, deleteUser } = UseUserApi.deleteUser();
  const { isUpdatingUser, updateUser } = UseUserApi.updateUser();

  const isUserBlocking = props.user.user_isBlocking;
  return (
    <Table.Row>
      <Stacked>
        <span>
          {props.user.user_firstName} {props.user.user_lastName}
        </span>
        <span>{props.user.user_email}</span>
      </Stacked>
      <UserName>{props.user.user_userName}</UserName>
      <UserRole $userRole={props.user.user_role}>
        {props.user.user_role}
      </UserRole>
      <UserPhoneNumber>{props.user.user_phoneNumber}</UserPhoneNumber>
      <Tag $type={isUserBlocking ? "red" : "green"}>
        {isUserBlocking ? "Blocking" : "UnBlocking"}
      </Tag>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={props.user._id || ""} />
          <Menus.List id={props.user._id || ""}>
            <Menus.Button
              icon={<BsEye />}
              onClick={() => navigate(`detail/${props.user._id}`)}
            >
              See detail
            </Menus.Button>
            {props?.user?.user_role?.toLowerCase() !== "admin" && (
              <>
                {!props.user.user_isBlocking ? (
                  <Modal.Open openWindowName="blockUser">
                    <Menus.Button icon={<TbLockCancel />}>
                      Block User
                    </Menus.Button>
                  </Modal.Open>
                ) : (
                  <Modal.Open openWindowName="blockUser">
                    <Menus.Button icon={<TbLockOff />}>
                      UnBlock User
                    </Menus.Button>
                  </Modal.Open>
                )}
                <Modal.Open openWindowName="deleteUser">
                  <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
                </Modal.Open>
              </>
            )}
          </Menus.List>
        </Menus.Menu>
        <Modal.Window windowName="deleteUser">
          <ConfirmDelete
            disabled={isDeletingUser}
            onConfirm={() => deleteUser({ _id: props.user._id })}
            resourceName={props.user.user_userName}
          />
        </Modal.Window>
        <Modal.Window windowName="blockUser">
          <ConfirmUpdate
            disabled={isUpdatingUser}
            onConfirm={() =>
              updateUser({
                _id: props.user._id,
                user_isBlocking: !props.user.user_isBlocking ? true : false,
              })
            }
            resourceName={`${
              !props.user.user_isBlocking ? "Block" : "Unblock"
            } user ${props.user.user_userName}`}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
