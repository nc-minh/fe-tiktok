import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserInfo, useGetUserByUsername } from 'queries/users';
import { UserInfo } from 'types/User';
import { getUserData, setUserData } from 'utils/storage';
import ProfileHeaderBase from 'app/components/ProfileHeaderBase';

function ProfileHeader() {
  const [user, setUser] = useState<UserInfo>();
  const { username = '' } = useParams();
  const [enabledMyself, setEnabledMyself] = useState(false);
  const { _id } = getUserData();

  const { data: GetUserByUsername, refetch } = useGetUserByUsername(
    username,
    true,
  );

  const { data: GetUserInfoLogin, refetch: refetchInfoLogin } =
    useGetUserInfo(enabledMyself);
  useEffect(() => {
    if (GetUserByUsername?._id === _id && GetUserByUsername?._id) {
      setEnabledMyself(true);
    } else {
      setUser(GetUserByUsername);
      setEnabledMyself(false);
    }
  }, [
    user,
    setUser,
    setEnabledMyself,
    enabledMyself,
    username,
    GetUserByUsername,
  ]);

  useEffect(() => {
    if (GetUserInfoLogin) {
      setUser(GetUserInfoLogin);
      setUserData(GetUserInfoLogin);
    }
  }, [GetUserInfoLogin, setUser, setEnabledMyself, enabledMyself, username]);

  return (
    <ProfileHeaderBase
      isEdit={enabledMyself}
      user={user}
      refetch={refetch}
      refetchInfoLogin={refetchInfoLogin}
    />
  );
}

export default ProfileHeader;
