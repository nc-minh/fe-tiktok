import { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserInfo, useGetUserByUsername } from 'queries/users';
import { UserInfo } from 'types/User';
import ProfileHeaderBase from 'app/components/ProfileHeaderBase';
import NotFound from './components/Notfound';
import { RootState } from 'stores';
import { useDispatch, useSelector } from 'react-redux';
import { globalStateActions } from 'app/layouts/slice';

function ProfileHeader() {
  const [user, setUser] = useState<UserInfo>();
  const { username = '' } = useParams();
  const dispath = useDispatch();
  const [enabledMyself, setEnabledMyself] = useState(false);
  const userLogin: any = useSelector(
    (state: RootState) => state.globalState.user,
  );
  const { _id } = userLogin;

  const {
    data: GetUserByUsername,
    refetch,
    isError,
  } = useGetUserByUsername(username, true);

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
      dispath(globalStateActions.getUser(GetUserInfoLogin));
    }
  }, [GetUserInfoLogin, setUser, setEnabledMyself, enabledMyself, username]);

  return (
    <>
      {isError ? (
        <NotFound />
      ) : (
        <ProfileHeaderBase
          isEdit={enabledMyself}
          user={user}
          refetch={refetch}
          refetchInfoLogin={refetchInfoLogin}
        />
      )}
    </>
  );
}

export default memo(ProfileHeader);
