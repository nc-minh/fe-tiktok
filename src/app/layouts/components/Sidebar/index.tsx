import { useCallback, useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';

import { routeConfig } from 'app/routes/routeConfig';
import Menu, { MenuItem } from './components/Menu';
import styles from './Sidebar.module.scss';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as HomeActiveIcon } from 'assets/icons/homeActive.svg';
import { ReactComponent as UserGroupIcon } from 'assets/icons/userGroup.svg';
import { ReactComponent as UserGroupActiveIcon } from 'assets/icons/userGroupActive.svg';
import { ReactComponent as LiveIcon } from 'assets/icons/live.svg';
import { ReactComponent as LiveActiveIcon } from 'assets/icons/liveActive.svg';
import SidebarContainer from 'app/components/SidebarContainer';
import Footer from 'app/layouts/components/Footer';
import { useGetFollowings } from 'queries/follow';
import { getUserData } from 'utils/storage';
import { FollowingsResponseType } from 'types/Follow';
import { UserInfo } from 'types/User';
import { useGetSuggestedAccounts } from 'queries/users';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
}

const SUGGESTED_ACCOUNTS_SHOW = 5;

function Sidebar({ className = '' }: Props) {
  const classes = cx('wrapper', { [className]: className });
  const { _id } = getUserData();

  const [followingAccounts, setFollowingAccounts] =
    useState<FollowingsResponseType[]>();
  const [suggestedAccounts, setSuggestedAccounts] = useState<UserInfo[]>();
  const [suggestedAccountsLess, setSuggestedAccountsLess] =
    useState<UserInfo[]>();
  const [footerText, setFooterText] = useState('See all');
  const [seeAllSwitch, setSeeAllSwitch] = useState(false);
  const [nextValue, setNextValue] = useState(0);

  const GetFollowingsStatus = _id ? true : false;

  const { data: GetFollowings, isLoading: isFollowingsLoading } =
    useGetFollowings(_id, GetFollowingsStatus, 5, nextValue);

  const { data: GetSuggestedAccounts, isLoading: isSuggestedLoading } =
    useGetSuggestedAccounts(15, 0, true);

  useEffect(() => {
    if (GetSuggestedAccounts) {
      const less = GetSuggestedAccounts.slice(0, SUGGESTED_ACCOUNTS_SHOW);
      setSuggestedAccountsLess(less);
      setSuggestedAccounts(GetSuggestedAccounts);
    }
  }, [GetSuggestedAccounts]);

  useEffect(() => {
    if (GetFollowings) {
      setFollowingAccounts(pre => {
        if (pre && nextValue !== 0) {
          return [...pre, ...GetFollowings];
        } else {
          return GetFollowings;
        }
      });
    }
  }, [GetFollowings, nextValue]);

  const handleSeeAllFollowings = useCallback(() => {
    setNextValue(nextValue + 1);
  }, [setNextValue, followingAccounts]);

  const handleSeeAllSuggested = useCallback(() => {
    setSeeAllSwitch(!seeAllSwitch);
    setFooterText(seeAllSwitch ? 'See all' : 'See less');
  }, [suggestedAccounts, suggestedAccountsLess, seeAllSwitch]);

  return (
    <aside className={classes}>
      <div className={cx('container')}>
        <Menu>
          <span>
            <MenuItem
              title="For You"
              to={routeConfig.home}
              icon={<HomeIcon />}
              activeIcon={<HomeActiveIcon />}
            />
            <MenuItem
              title="Following"
              to={routeConfig.following}
              icon={<UserGroupIcon />}
              activeIcon={<UserGroupActiveIcon />}
            />
            <MenuItem
              title="LIVE"
              to={routeConfig.live}
              icon={<LiveIcon />}
              activeIcon={<LiveActiveIcon />}
            />
          </span>
        </Menu>
        <SidebarContainer
          suggested={seeAllSwitch ? suggestedAccounts : suggestedAccountsLess}
          title="Suggested accounts"
          footerText={footerText}
          type={'suggested'}
          onSeeAll={handleSeeAllSuggested}
          isSuggestedLoading={isSuggestedLoading}
        />
        {GetFollowingsStatus && (
          <SidebarContainer
            followings={followingAccounts}
            title="Following accounts"
            footerText="See more"
            onSeeAll={handleSeeAllFollowings}
            isFollowingsLoading={isFollowingsLoading}
          />
        )}

        {/* footer */}
        <Footer />
      </div>
    </aside>
  );
}

export default memo(Sidebar);
