/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import routeConfig from 'app/routes/routeConfig';
import styles from './Header.module.scss';
import tiktokLogo from 'assets/images/tiktokLogo.svg';
import Button from 'app/components/Button';
import Menu from 'app/containers/Menu';
import Image from 'app/components/Image';
import { ReactComponent as InboxIcon } from 'assets/icons/inbox.svg';
import { ReactComponent as MessageIcon } from 'assets/icons/message.svg';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import { ReactComponent as LanguageIcon } from 'assets/icons/english.svg';
import { ReactComponent as QuestionIcon } from 'assets/icons/question.svg';
import { ReactComponent as KeyboardIcon } from 'assets/icons/keyboard.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as GetCoinIcon } from 'assets/icons/getCoin.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/setting.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';
import { ReactComponent as MoreIcon } from 'assets/icons/more.svg';
import SearchBar from 'app/components/SearchBar';
import { MenuItemType } from 'types/Menu';
import { useSearchUsers } from 'queries/users';
import { useDebounce } from 'app/hooks';

const cx = classNames.bind(styles);

function Header() {
  const { t } = useTranslation();
  const [textSearch, setTextSearch] = useState('');
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const debouncedValue = useDebounce(textSearch, 500);

  const MENU_ITEMS: MenuItemType[] = [
    {
      icon: <LanguageIcon />,
      title: 'English',
      children: {
        title: 'Language',
        data: [
          {
            code: 'en',
            title: 'English',
          },
          {
            code: 'vi',
            title: 'Tieng Viet',
          },
        ],
      },
    },
    {
      icon: <QuestionIcon />,
      title: 'Feedback and Help',
      to: '/feedback',
    },
    {
      icon: <KeyboardIcon />,
      title: 'Keyboard shortcuts',
    },
  ];
  const currentUser = true;
  const data = true;

  const USER_MENU: MenuItemType[] = [
    {
      icon: <UserIcon />,
      title: 'View profile',
      to: '/ok',
    },
    {
      icon: <GetCoinIcon />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <SettingIcon />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <LogoutIcon />,
      title: 'Log out',
      to: '/signout',
      separate: true,
    },
  ];

  const { data: searchUsersResults } = useSearchUsers(
    {
      q: debouncedValue,
      type: 'less',
    },
    isFocus,
  );

  const handleChangeSearch = useCallback(
    (event: any) => {
      const { type, keyCode } = event;
      if (type === 'keydown' && keyCode === 13) {
        setTextSearch(event.target.value);
      }
      return setTextSearch(event.target.value);
    },
    [setTextSearch, textSearch],
  );

  const handleClearSearch = useCallback(
    (event: any) => {
      setTextSearch('');
      setIsFocus(false);
      setTooltipIsOpen(false);
    },
    [setTextSearch, textSearch],
  );

  const handleOnFocus = useCallback(() => {
    console.log('vai loz');
    setIsFocus(true);
    if (searchUsersResults?.length > 0) setTooltipIsOpen(true);
  }, [isFocus, setIsFocus, searchUsersResults]);

  const handleOnBlur = useCallback(() => {
    setTooltipIsOpen(false);
    setIsFocus(false);
  }, [isFocus, setIsFocus, searchUsersResults]);

  useEffect(() => {
    if (searchUsersResults?.length > 0) setTooltipIsOpen(true);
    console.log('searchUsersResults:::', searchUsersResults);
  }, [searchUsersResults]);

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={routeConfig.home} className={cx('logo')}>
          <Image src={tiktokLogo} alt="tiktok logo" />
        </Link>

        <SearchBar
          autoFocus={false}
          value={textSearch}
          placeHolder={t('placeHolder')}
          onChange={handleChangeSearch}
          onClear={handleClearSearch}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          tooltipIsOpen={tooltipIsOpen}
          listResults={searchUsersResults}
        />
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Tooltip arrow title="Upload video" placement="bottom">
                <span className={cx('action-btn')}>
                  <UploadIcon />
                </span>
              </Tooltip>
              <Tooltip arrow title="Message" placement="bottom">
                <span className={cx('action-btn')}>
                  <MessageIcon />
                </span>
              </Tooltip>
              <Tooltip arrow title="Inbox" placement="bottom">
                <span className={cx('action-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>12</span>
                </span>
              </Tooltip>
            </>
          ) : (
            <>
              <Button text>Register</Button>
              <Button primary>Login</Button>
            </>
          )}

          <Menu items={currentUser ? USER_MENU : MENU_ITEMS}>
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                src="https://res.cloudinary.com/domvksfsk/image/upload/v1654866231/images/ae701b234250215809a234c8c0017c644bc36cc1.png"
                alt="avatar"
              />
            ) : (
              <span className={cx('more-btn')}>
                <MoreIcon />
              </span>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
